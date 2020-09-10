function OSwebpush(_option) {
	var self = this;

	// onesignal 相关配置默认参数，后台配置为 Typeical Site 模式
	// 更多相关参数 https://documentation.onesignal.com/docs/web-push-sdk
	this.option = {
		// 此为 www 域下 id, 测试环境 id 21872455-4612-4b40-b321-bf0ef0f1de30
		appId: '6b5a6402-ac2e-40fe-8be3-4b3f5d3dc202',
		safari_web_id: "web.onesignal.auto.3f58661c-f8ad-4946-a9b6-84125eec4421",
		// appId: '0d9347c6-a944-4e7e-9bdf-5366e1e20ee7',//beta5
		// safari_web_id: "web.onesignal.auto.0b751c21-4ab5-448f-a888-cd2e20e2cfd5",//beta5
		// 默认防止自动注册，仅仅触发系统弹窗
		autoRegister: false,
	}

	// 用户 onesignal_id
	this.oid = '';

	// 关注状态，0 默认， 1 订阅， 2 拒绝
	this.status = 0;

	this.storageKey = "webpushUser";

	// 参数合并
	$.extend(this.option, _option);

	window.OneSignal = window.OneSignal || []

	if(window.location.href.indexOf('www.newchic.com') > -1){
		// install script
		var link = document.createElement('link');
		link.setAttribute('rel', 'manifest');
		link.setAttribute('href', '/manifest.json');
		var script = document.createElement('script');
		script.setAttribute('src', 'https://cdn.onesignal.com/sdks/OneSignalSDK.js');
		script.setAttribute('async', true);
		script.onload = function () {
			if (window.OneSignal.isPushNotificationsSupported()) {
				self.init();
			}
		}
		var head = document.querySelector('head');
		head.appendChild(link);
		head.appendChild(script);
	}

}

OSwebpush.prototype.init = function () {
	var S = this;
	// window.OneSignal = window.OneSignal || []
	OneSignal.push(function () {
		if (OneSignal.isPushNotificationsSupported()) {
			// 初始化 onesignal
			OneSignal.init && OneSignal.init(S.option)

			// 调起浏览器订阅
			OneSignal.showNativePrompt && OneSignal.showNativePrompt()

			// 初始化后记录用户信息 - 1: 仅登录用户模式，在headData调用
			// S.sendRecord(1)

			// 更新订阅状态后记录用户信息 - 2: 所有记录模式
			OneSignal.on && OneSignal.on('subscriptionChange', function () {
				S.sendRecord(2);
			})

			// when notification opend , send record
			OneSignal.push(function () {
				var onNotificationClicked = function () {
					OneSignal.getUserId().then(function (userId) {
						S.sendNotificationOpenedRecord(userId);
					});
				}

				var handler = function () {
					// call your primary handler
					onNotificationClicked();

					// add another handler right away
					OneSignal.addListenerForNotificationOpened(handler);
				};

				// attach your handler for the first time
				OneSignal.addListenerForNotificationOpened(handler);
			})
		}
	})
};

OSwebpush.prototype.sendRecord = function (type, storage) {
	var S = this;
	OneSignal.push(function () {//防止onesignal未加载就执行造成报错
		if (OneSignal.isPushNotificationsSupported()) {
			Promise.all([
				// 获取 oid 返回 Promise 类型
				OneSignal.getUserId && OneSignal.getUserId().then(function (userId) {
					S.oid = userId
				}),
				// 获取 status 返回 Promise 类型
				OneSignal.getNotificationPermission && OneSignal.getNotificationPermission(function (permission) {
					switch (permission) {
						case 'default':
							S.status = 0
							break
						case 'granted':
							S.status = 1
							break
						case 'denied':
							S.status = 0
							break
						default:
							break
					}
				}),
			]).then(function () {
				if (S.checkIfSend(type, storage)) {
					$.ajax({
						url: "/api/ajax/subscribeWebPush/",
						type: 'GET',
						data: 'sq=' + encodeURIComponent(queryHandle.encrypt("onesignal_id=" + S.oid + "&is_subscribe=" + S.status)),
						dataType: 'json',
						success: function (res) {
							if (type == 1) {
								window.localStorage.setItem(S.storageKey, storage + "|" + S.status);
							}
						},
					})
				}
			})
		}
	})
};

OSwebpush.prototype.checkIfSend = function (type, storage) {
	var S = this,
		storageInfoArr = window.localStorage.getItem(S.storageKey) ? window.localStorage.getItem(S.storageKey).split("|") : "";
	if (S.oid) {
		if (type == 1) {
			if (storageInfoArr[0] != storage || storageInfoArr[1] != S.status) {
				return true;
			} else {
				return false;
			}
		} else if (type == 2) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

OSwebpush.prototype.sendNotificationOpenedRecord = function (id) {
	$.ajax({
		url: "/api/ajax/webpushOpenEventTrigger/",
		type: 'GET',
		data: 'sq=' + encodeURIComponent(queryHandle.encrypt("onesignal_id=" + id)),
		dataType: 'json',
	})
}

$(function () {
	$(window).load(function(){
		//首先判断当前链接是否带有checkout和shopping_cart
		if (window.location.href.indexOf("checkout") == -1 && window.location.href.indexOf("shopping_cart") == -1) {
			window.NC_webPush = new OSwebpush();
		}
	})
})