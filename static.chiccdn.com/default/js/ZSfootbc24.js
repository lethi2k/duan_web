
	//邮件订阅提交
	function subscribes_form_submit(obj){
		//域名
		var location_url = 'http://'+window.location.host+'/'+'api/ajax/subscribes/';
		//获取email的内容
		//var email = $(obj).siblings('.inputbox').find('input').val();
		var email = $.trim($(obj).closest('.input-group').find('[name="subscribes-email"]').val());
		if(!email){
			ZSAlert('Please enter your email !', 'Error','');
		}else if(!check_email(email)){//验证邮箱是否合法
			ZSAlert('Please enter a valid email !', 'Error','');
		}else{
			var ajaxTimeoutTest =$.ajax({
				url:location_url,
				timeout : 10000,
				type : 'get',
				dataType:'json',
				data :'email='+email,
				success:function(obj){
					ZSAlert( obj.message , 'Message' ,'');
				},
				complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
						ajaxTimeoutTest.abort();
					}
				}
			});
		}
	}

	//js邮箱正则验证
	function check_email(str/*String*/){
		var reg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		return reg.test(str);
	}

	//邮件订阅提交
	function unsubscribe(){
		//获取email的内容
		var email = $('#uEmail').val();
		var uType = $('#uType').val();

		if(!$.trim(email)){
			ZSAlert('Please enter your email !', 'Error','');
		}else if(!check_email(email)){//验证邮箱是否合法
			ZSAlert('Please enter a valid email !', 'Error','');
		}else{
			var ajaxTimeoutTest =$.ajax({
				url:homeUrl+'api/unsubscribe/unsubscribe/',
				type : 'get',
				dataType:'json',
				data :'email='+email+'&uType='+uType,
				beforeSend:function(){
					ZSLoad();
				},
				success:function(obj){
					$.ZSmsgBox._hide();
					ZSAlert(obj.msg , 'Message' ,'');
				},
			});
		}
	}

	//回到顶部模块
	toTop();
	function toTop(){
		var $window = $(window);
		var $btn = $(".totop_btn");
		var $app = $(".app_btn");
		$window .scroll(function(){
			if($window.scrollTop()>300){
				$btn.slideDown(200);
			}else{
				$btn.slideUp(200);
			}
		});
		$btn.click(function(){
			$("html,body").animate({scrollTop:0});
		});
		$app.HoverDelay({
			hoverDuring: 100,
			outDuring: 100,
			hoverEvent: function(obj){
				return function(){
					obj = $(obj);
					obj.find("div").show();
				}
			},
			outEvent: function(obj){
				return function(){
					obj = $(obj);
					obj.find("div").hide();
				}
			}
		});
	}

	//锚点平滑滚动处理
    $("a[href*=#],area[href*=#]").click(function(event){
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                },
				300);
				event.preventDefault();
            }
        }
    });

	$(".inputbox").ZSinput();

	//顶部下拉框hover事件
	/*
	$(".head .currency, .head .mobile, .head .help,.head .account,.head .language").HoverDelay({
		hoverEvent: function(obj){
			return function(){
				$(obj).children(".box").slideDown(200);
			}
		},
		outEvent: function(obj){
			return function(){
				$(obj).children(".box").slideUp(200);
			}
		}
	});
	*/

	//full site
	$("#full_site").on("click",function(){
		var url = $(this).attr("data-href");
		var rep = url.replace('www.','m.');
		rep = rep.replace('?pm=1','');
		rep = rep.replace('?pm=2','');
		window.location.href = rep+'?pm=2';
	});

	$(".special-publicize .close").on("click",function(){
		// 点击关闭时，清除此广告banner
		var $top_ad = $(this).closest(".special-publicize"),
			imgUrl = $('.banner_click img', $top_ad).attr('src');
		$.cookie('top_ad_img', imgUrl, {expires:30, path:'/'});
		$top_ad.slideUp(200).remove();
        $.coutnav();
	});

	// top_ad
	//
	(function () {
		var $top_ad = $('.special-publicize'),
			adUrl = $.cookie('top_ad_img'),
			imgUrl = $('.banner_click img', $top_ad).attr('src');
		if ( !$top_ad.length || !adUrl) {
			return;
		}
		if (imgUrl === adUrl) {
			$top_ad.slideUp(200).remove();
		}
		var $home=$('.home_index_head')
        var head_height=$('.head_lst',$home).outerHeight()+$('.nav',$home).outerHeight();
        if($('.special-publicize',$home).length){
            head_height=head_height+45;
        }
        $home.css('height',head_height+'px');
	})();
	$(function(){


		var checkEmail = function(){
			var val = $.trim(this.value),
				errMsg = null,
				$group = $(this).closest('.input-group'),
				$err = $group.find('.err-msg');
			if (!val) {
				errMsg = 'Please enter your email !';
			} else if (!check_email(val)) {
				errMsg = 'Please enter a valid email !';
			}
			if(errMsg){
				!$err.length && ($err = $('<div class="err-msg" />').appendTo($group));
				$err.html(errMsg);
			}else{
				$err.remove();
			}
		};
		$('.btn-subscribes').click(function(){
			var $email = $('input[name="subscribes-email"]');
			checkEmail.call($email[0]);
			if($(this).closest('.input-group').find('.err-msg:visible').length){
				return;
			} else {
				var email = $.trim($email.val());
				if($('.anchor-email-subscribe').length > 0){
					window.location = "#winner";
				}else{
					window.location = "/subscribing.html?#winner";
				}
				/*var location_url = 'http://'+window.location.host+'/'+'api/ajax/subscribes/',
					email = $.trim($email.val()),
					ajaxTimeoutTest =$.ajax({
						url:location_url,
						timeout : 10000,
						type : 'get',
						dataType:'json',
						data :'email='+email,
						success:function(obj){
							ZSAlert( obj.message , 'Message' ,'');
						},
						complete : function(XMLHttpRequest,status){
							if(status=='timeout'){
								ajaxTimeoutTest.abort();
							}
						}
					});	*/
			}
		});
		$('input[name="subscribes-email"]').blur(function(){
			// 此处不用工作了
		}).focus(function(){
			 $(this).closest('.input-group').find('.err-msg').remove();
		});
	});

$(function () {
  // 网页头部滚动广告
  (function () {
    var timer = null;
    $('.top-favorable').mouseenter(function () {
      timer && clearTimeout(timer);
    }).mouseleave(function () {
      timer = setTimeout(function animate() {
        if (!$('.top-favorable>div').is('animated')) {
          $('.top-favorable>div').animate({ 'margin-top': '-38px' }, 500, function () {
            $(this).children().eq(0).appendTo($(this));
            $(this).css('margin-top', 0);
            timer = setTimeout(animate, 10000);
          });
        }
      }, 10000);
    }).trigger('mouseleave');
	})();
	
/*live chat 事件队列初始化*/
function EventQueue() {
  this._event = {};
}

EventQueue.prototype.push = function (hook, fn) {
  if(!this._event[hook]){
    this._event[hook] = [];
  }
  this._event[hook].push(fn);
}
var liveChatEventQueue = new EventQueue();

  // @function Initialize livechat
  // Livechat installation, @see https://my.livechatinc.com/instructions/9684415
  function installLivechat() {
    var defer = $.Deferred();
    if (!window.LC_API) {
      var lcScriptElem = document.createElement('script');
      lcScriptElem.type = 'text/javascript';
      lcScriptElem.async = true;
      lcScriptElem.src =
        ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
      var scriptElem = document.getElementsByTagName('script')[0];
      scriptElem.parentNode.insertBefore(lcScriptElem, scriptElem);
      lcScriptElem.onload = function () {
        defer.resolve();
      };
    } else {
      defer.resolve();
    }
    return defer.promise();
  }

  // @function Get user viewed products to server
  function getViewedProducts() {
    return $.ajax({
      url: '/api/ajax/getVCproducts/?zmkm=1',
      type: 'post',
      dataType: 'json'
    });
  }
  // @function Get user infomation to server
  // function getUserInfo() {
  //     var liveChatParams = '';
  //     return $.ajax({
  //         url:'/api/ajax/getCustomerInfo/',
  //         type:'post',
  //         dataType:'json',
  //         success:function(res){
  //             if(res.customers_name){
  //                 liveChatParams += '&name='+res.customers_name;
  //             }
  //             if(res.customers_email_address){
  //                 liveChatParams += '&email='+res.customers_email_address;
  //             }
  //         }
  //     });
  // }

  // @function Open Livechat
  // @param {String} openStatus: 'min' | 'max'
  function openLiveChat(openStatus) {
    if (openStatus === 'max') {
      window.LC_API.open_chat_window();
    } else if (openStatus === 'min') {
      window.LC_API.minimize_chat_window();
    } else {
      // default: maximize the chat window
      window.LC_API.open_chat_window();
    }
  }

  // @function Initialize Livechat
  // For Livechat developer API, @see https://docs.livechatinc.com/js-api/
  function initLiveChat(livechatOpenStatus) {
    $('.fix_lst_box.open-live-chat').loading(true);
    getViewedProducts().done(function (data) {
      window.__lc = window.__lc || {};
      window.__lc.license = 10095588;
			window.__lc.group = 1;
			window.__lc.chat_between_groups = false;
      window.__lc.params = data;
      if ($('#customers_name').length > 0 && $('#customers_emial').length > 0) {
        window.__lc.visitor = {
          name: $('#customers_name').val(),
          email: $('#customers_emial').val(),
        };
      }
      installLivechat().done(function () {
				liveChatEventQueue.push('on_chat_started',function(){
          window.localStorage.setItem('livechat-started', true);
        });
        liveChatEventQueue.push('on_chat_ended',function(){
          window.localStorage.removeItem('livechat-started');
          window.localStorage.removeItem('livechat-open-status');
        });
        liveChatEventQueue.push('on_chat_window_opened',function(){
          window.localStorage.setItem('livechat-open-status', 'max');
        });
        liveChatEventQueue.push('on_chat_window_minimized',function(){
          window.localStorage.setItem('livechat-open-status', 'min');
        });
        liveChatEventQueue.push('on_after_load',function(){
          openLiveChat(livechatOpenStatus);
          $('.fix_lst_box.open-live-chat').loading(false);
        });

        initLiveChatRatingReminder();

        window.LC_API.on_chat_started = function () {
          var fnArr = liveChatEventQueue._event['on_chat_started'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
        window.LC_API.on_chat_ended = function () {
          var fnArr = liveChatEventQueue._event['on_chat_ended'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
        window.LC_API.on_chat_window_opened = function () {

          var fnArr = liveChatEventQueue._event['on_chat_window_opened'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
        window.LC_API.on_chat_window_minimized = function () {
          var fnArr = liveChatEventQueue._event['on_chat_window_minimized'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
        window.LC_API.on_after_load = function () {
          var fnArr = liveChatEventQueue._event['on_after_load'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
        window.LC_API.on_rating_submitted = function () {
          var fnArr = liveChatEventQueue._event['on_rating_submitted'];
          for(var key in fnArr){
            fnArr[key]();
          }
        }
      });
    });
  }

  function initLiveChatRatingReminder() {
    window.lcRatingReminder = {
      ratingCookie: null,
      ratingTimeout: null,
      leftHeight: null,
      matchMediaLeft: null,
      newThemeEnabled: false,
      newWindowMax: 655,
      rateDelay: 180000,

      showRatingReminder: function (ratingCookieVar) {
        if (ratingCookieVar !== null && ratingCookieVar !== 'false' && LC_API.chat_window_maximized()) {
          if (ratingCookieVar <= Date.now())
            $('#lc-rating-reminder').show();
          else {
            var timeout = ratingCookieVar - Date.now();
            lcRatingReminder.ratingTimeout = setTimeout(function () {
              if (LC_API.chat_window_maximized())
                $('#lc-rating-reminder').show();
            }, timeout);
          }
        }
      },

      mediaCheck: function () {
        if (lcRatingReminder.newThemeEnabled) {
          var reminderElement = $('#lc-rating-reminder');
          lcRatingReminder.matchMediaLeft = window.matchMedia('(max-height:' + (lcRatingReminder.newWindowMax) + 'px)').matches;
          if (lcRatingReminder.matchMediaLeft && reminderElement) {
            reminderElement.addClass('low');
          } else {
            reminderElement.removeClass('low');
          }

        } else {
          lcRatingReminder.leftHeight = $('#livechat-full').height();
          lcRatingReminder.matchMediaLeft = window.matchMedia('(max-height:' + ((lcRatingReminder.leftHeight) + 75) + 'px)').matches;

          var reminderElement = $('#lc-rating-reminder.smooth, #lc-rating-reminder.circle');

          if (lcRatingReminder.matchMediaLeft && reminderElement) {
            reminderElement.addClass('left');
            if (reminderElement.hasClass('smooth'))
              reminderElement.css('bottom', (lcRatingReminder.leftHeight - 7 * 14) + 'px');
            else if (reminderElement.hasClass('circle'))
              reminderElement.css('bottom', (lcRatingReminder.leftHeight - 7.5 * 16) + 'px');
          } else {
            reminderElement.removeClass('left');
            reminderElement.css('bottom', '');
          }
        }
      },

      newThemeCheck: function () {
        lcRatingReminder.newThemeEnabled = false;

        if ($('#chat-widget-container').length > 0)
          lcRatingReminder.newThemeEnabled = true;
      },

      init: function () {
        window.LC_API = window.LC_API || {};

        liveChatEventQueue.push('on_after_load', function () {
          lcRatingReminder.newThemeCheck();
          lcRatingReminder.mediaCheck();
          lcRatingReminder.ratingCookie = window.localStorage.getItem('lc-rating-reminder');
          if (LC_API.chat_running() && lcRatingReminder.ratingCookie === null) {
            window.localStorage.setItem('lc-rating-reminder', Date.now() + lcRatingReminder.rateDelay);
            lcRatingReminder.ratingCookie = window.localStorage.getItem('lc-rating-reminder');
          }
        });
        liveChatEventQueue.push('on_chat_window_opened', function () {
          setTimeout(function () {
            if (lcRatingReminder.ratingCookie !== null) {
              if (LC_API.chat_running()) {
                lcRatingReminder.showRatingReminder(lcRatingReminder.ratingCookie);
              } else
                window.localStorage.removeItem('lc-rating-reminder');
            }
          }, 500);
        });
        liveChatEventQueue.push('on_chat_window_minimized', function () {
          $('#lc-rating-reminder').hide();
        });
        liveChatEventQueue.push('on_chat_started', function () {
          lcRatingReminder.mediaCheck();
          if (lcRatingReminder.ratingCookie === null) {
            window.localStorage.setItem('lc-rating-reminder', Date.now() + lcRatingReminder.rateDelay);
            lcRatingReminder.showRatingReminder(Date.now() + lcRatingReminder.rateDelay);
          }
        });
        liveChatEventQueue.push('on_chat_ended', function () {
          window.localStorage.removeItem('lc-rating-reminder');
          $('#lc-rating-reminder').hide();
        });
        liveChatEventQueue.push('on_rating_submitted', function (data) {
          if (data !== 'none') {
            $('#lc-rating-reminder').hide();
            window.localStorage.setItem('lc-rating-reminder', false);
            clearTimeout(lcRatingReminder.ratingTimeout);
          } else {
            lcRatingReminder.mediaCheck();
            window.localStorage.setItem('lc-rating-reminder', Date.now() + lcRatingReminder.rateDelay);
            lcRatingReminder.showRatingReminder(Date.now() + lcRatingReminder.rateDelay);
          }
        });

        $('#lc-rating-reminder-close').click(function () {
          $('#lc-rating-reminder').hide();
          window.localStorage.setItem('lc-rating-reminder', false);
        });

        $(window).resize(function () {
          lcRatingReminder.mediaCheck();
        });

        setInterval(function () {
          lcRatingReminder.mediaCheck();
          lcRatingReminder.ratingCookie = window.localStorage.getItem('lc-rating-reminder');
          if (lcRatingReminder.ratingCookie !== null && lcRatingReminder.ratingCookie !== 'false') {
            if (LC_API.chat_running()) {
              lcRatingReminder.showRatingReminder(lcRatingReminder.ratingCookie);
            } else
              window.localStorage.removeItem('lc-rating-reminder');
          } else {
            $('#lc-rating-reminder').hide();
          }
        }, 3000)
      }
    };

    var ua = navigator.userAgent;
    var mobile = /((Chrome).*(Mobile))|((Android).*)|((iPhone|iPod).*Apple.*Mobile)|((Android).*(Mobile))/i;


    // disable on mobile
    if (!mobile.test(ua)) {
      lcRatingReminder.init();
    }

  }

  // check whether user start the chat before
  var isLivechatStarted = window.localStorage.getItem('livechat-started');
  if (isLivechatStarted) {
    var livechatOpenStatus = window.localStorage.getItem('livechat-open-status');
    initLiveChat(livechatOpenStatus);
  }

  // open livechat if user click on chat button
  $(document).on('click', '.open-live-chat', function () {
    if (!window.LC_API) {
      initLiveChat('max');
    } else {
      openLiveChat('max');
    }
  });
});


// 当前页弹窗登录
$(document).on('click', '.post-now a', function(e){
	e.preventDefault();
	if ($.loginStatus) {
		window.location.href = this.href;
	}else {
		$.signUser.getSignHtml();
	}
});

// add ship to
$(function(){
	/*$(".select_box .country_list").mCustomScrollbar({
		scrollButtons:{
			enable: false
		}
	});*/

	// $('.ship_wrap').HoverDelay({
	// 	hoverEvent: function(obj){
	// 		return function(){
	// 			$(obj).children(".ship_modal").slideDown(200);
	// 		}
	// 	},
	// 	outEvent: function(obj){
	// 		return function(){
	// 			$(obj).children(".ship_modal").slideUp(200);
	// 		}
	// 	}
	// });



	$(document)
	/*
	.on('mouseenter', '.ship_modal .cont', function(){
		var $this = $(this);
		this.timer = setTimeout(function () {
			$this.addClass('active')
				 .find('.select_box').show();

			$('.country_list img[data-src]', $this).each(function () {
				this.src = $(this).data('src');
				$(this).removeAttr('data-src');
			})
		}, 100);

		// $(".select_box .country_list").mCustomScrollbar('update');
	})
	.on('mouseleave', '.ship_modal .cont', function(){
		this.timer && clearTimeout(this.timer);
		$(this).removeClass('active')
			 .find('.select_box').hide();
	})
	*/
	//在搜索部分再改
	.on('input propertychange click', '.select_box .msearch', function(e){
		e.stopPropagation();
		var keyword = $(this).val();
        $(".country_list li").hide().each(function() {
            if ($(this).find('span').text().toLowerCase().indexOf(keyword.toLowerCase()) == 0) {
                $(this).show();
            }
        });
	});
});

function getProductsPrice(productIdArray) {
	var proData = {
		"products_id": productIdArray.join('-'),
		cdn_lang: $('html').attr('lang') || 'en',
		cdn_currency: $.cookie('currency'),
		country: $.cookie('default_rule_country'),
		newVersion: 1,
	};
	if (getQueryString('utm_medium')) {
		proData['utm_medium'] = getQueryString('utm_medium');
	}
	if (window.has_seckill) {
		proData.has_seckill = 1;
	}
	var pagetype = null;
	var path = window.location.pathname;
	if (path.match(/clearance/)) {
		pagetype = 'clearance';
	} else if (path.match(/products\-promotion/)) {
		pagetype = 'activity';
	} else if (path.match(/theme/)) {
		pagetype = 'creativeLink';
	} else if (path.match(/fashion\-collection/)) {
		pagetype = 'smartTemplate';
	}
	if (pagetype != null) {
		proData.pagetype = pagetype;
	}
	return $.ajax({
		url: '/api/ajax/ajaxProductsPrice/',
		method: 'GET',
		dataType: 'json',
		data: proData
	});
}

function extractProductIds($productList, productMap) {
	for (var i = 0; i < $productList.length; i++) {
		var productId = $productList.eq(i).data('productId');
		if (productId != null && productId != '') {
			if(productMap[productId]!=undefined){
			  productMap[productId].push($productList.eq(i));
			}else{
			  productMap[productId] = [];
			  productMap[productId].push($productList.eq(i));
			}
		  }
	}
	var productIdArray = [];
	for (var productId in productMap) {
		productIdArray.push(productId);
	}
	return productIdArray;
}

/*
 * @function updateProductsPrice
 * @param customSelectors {Object} Custom selector to locate the products on the pages.
 *    Default value:
 *   {
 *     productSelector: '.product-list-js .product-item-js',
 *     priceSelector: '.product-price-js',
 *     discountSelector: '.product-discount-js',
 *     specialPriceSelector: '.product-special-price-js',
 *     clearancePriceSelector: '.product-clearance-price-js'
 *   }
 *
 */
var DEFAULT_SELECTORS = {
	productSelector: '.product-list-js .product-item-js',
	priceSelector: '.product-price-js',
	discountSelector: '.product-discount-js',
	specialPriceSelector: '.product-special-price-js',
	clearancePriceSelector: '.product-clearance-price-js'
};
function updateProductsPrice(customSelectors) {
	selectors = $.extend({}, DEFAULT_SELECTORS, customSelectors);
	productSelector = selectors.productSelector;
	var $productList = $(productSelector);
	if ($productList.length > 0) {
		var productMap = {};
		var productIdArray = extractProductIds($productList, productMap);
		getProductsPriceByGroup(productIdArray, productMap);
	}
}

function getProductsPriceByGroup(productIdArray, productMap) {
	if (productIdArray.length == 0) {
		return;
	}
	var ajaxProductIdArray = [];
	var maxSize = 100;
	if (productIdArray.length > maxSize) {
		ajaxProductIdArray = productIdArray.splice(0, maxSize);
	} else {
		ajaxProductIdArray = productIdArray.splice(0, productIdArray.length);
	}
	getProductsPrice(ajaxProductIdArray).then(function (data) {
		if (productIdArray.length > 0) {
			getProductsPriceByGroup(productIdArray, productMap);
		}
		var productData;
		if (data instanceof Array) {
			productData = data;
		} else {
			productData = [];
			for (var key in data) {
				productData.push(data[key]);
			}
		}
		productData.forEach(function (product) {
			var $productItemArr = productMap[product.products_id];
			if ($productItemArr.length > 0) {
				$productItemArr.forEach(function ($product) {
					var $price = $product.find(selectors.priceSelector);
					var $discount = $product.find(selectors.discountSelector);

					$price.attr('oriprice', product.final_price);
					$price.text(product.format_final_price);
					$discount.text(product.discount);
					// handle buy n / xxx
					if (product.list_type == 2) {
						var $totalPrice = $product.find(selectors.specialPriceSelector);
						$totalPrice.attr('oriprice', product.s_total_price);
						$totalPrice.text(product.s_format_special_total_price);
					}
					// handle clearance
					if (product.clearStock == 1) {
						var $clearancePrice = $product.find(selectors.clearancePriceSelector);
						$clearancePrice.attr('oriprice', product.clearance_price);
						$clearancePrice.text(product.format_clearance_price);
					}
				})
			}
		});
	});
}

// update products price
(function() {
	updateProductsPrice();
})();