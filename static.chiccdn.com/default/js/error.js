/**
 * 捕获错误异常
 * 
 * 常见问题
 *      1. 不同源抛出 Script error.
 * 		2. 网络问题 NetworkError: A network error occurred
 * 		3. 火狐插件问题 NS_ERROR_FILE_ACCESS_DENIED
 */
var BGCollect = {
    // 过滤url
    filterUrl: 'banggood', 
    // 错误处理间隔时间
    delay: 5000, 
    // 错误日志列表
    errorList: [], 
    // 繁忙
    busy: false, 
    // 发送
    send: function(){
		var _this = this;

        if(_this.busy){
            return false;
        }
		
        if(!_this.busy){
			clearInterval(_this.timer);
		}
		
		_this.busy = true;
		
        _this.timer = setTimeout(function(){
            var info = {
                url: window.location.href,
                error: _this.errorList
            };

            var akamaiCookie = _this.getAkamaiCookie();
            if (akamaiCookie) {
                info.akamaiCookie = akamaiCookie;
            }

            $.ajax({
                url: '/tool/nclog.php?status=1',
                method: 'POST',
                data: {
                    info: JSON.stringify(info)
                }
            });

            _this.busy = false;
            _this.errorList = [];

        }, _this.delay);
    },
    // 初始化
    init: function(){
		var _this = this,
			filter = [
                'Script error',
                'Script error.',
				'A network error occurred',
                'NS_ERROR_FILE_ACCESS_DENIED'
			];

        // 捕获异常
        window.onerror = function(message, source, lineNo, colNo, error){
            var msg = message;
        
            if(source) {
                msg += " at " + source;
            }
            if(lineNo || colNo) {
                msg += ':' + lineNo + ':' + colNo;
			}
			
			// 如果报错链接等于当前链接，并且报错行数是1，过滤
			// if(filter.indexOf(msg) != -1 || (window.location.href == source && lineNo == 1)){
			// 	return false;
            // }
            var filterFlag = filter.filter(function (filterWord) {
                return msg.indexOf(filterWord) > -1
            });

            if (filterFlag.length) {
                return false;
            }
            
            if(msg.indexOf('rec.banggood') != -1  || msg.indexOf('dc.banggood') != -1){
                return false;
            }
        
            if(msg) {
                _this.errorList.push(msg);
                _this.send();
            }
        };
        
        // 捕获404
        window.addEventListener('error', function(event) {
            // var errorTarget = event.target;
            // if(errorTarget !== window && errorTarget.nodeName && errorTarget.src.indexOf(_this.filterUrl) != -1) {
            //     _this.errorList.push(errorTarget.src + ' 404 (Not Found)');
            //     _this.send();
            // }
        }, true);
    },
    getAkamaiCookie: function () {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");

        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0].indexOf('akaas_') > -1) {
                return arr.slice(1).join('=');
            }
        }
        return "";
    }
};
BGCollect.init();