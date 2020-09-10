$(function () {
  NCrecord = null;
  $.sendExposureManualiy = null;
  $.sendExposureManualiyArr = null;
  // //获取到当前的语言
  var currentLangForExposure = "main";//两套模板可以直接返回
  if (window.location.href.indexOf('newchic.in') > -1) {
    currentLangForExposure = 'in';
  } else if (window.location.href.indexOf('ar.newchic.com') > -1 || window.location.href.indexOf('newchic.com/ar/') > -1) {
    currentLangForExposure = 'ar';
  }
  if (window.G_SWITCH_CONFIG && window.G_SWITCH_CONFIG.exposure && window.G_SWITCH_CONFIG.exposure.pc && window.G_SWITCH_CONFIG.exposure.pc[currentLangForExposure]) {
    // 设置全局函数，接口返回执行，主要是接口返回找不到对应函数报错
    window.nDCRecordExposure = function (str) {
      // console.log(str)
    };

    // 产品曝光， banner广告位曝光
    NCrecord = {
      attr: 'data-exposure-record', // 默认解析标识
      attrClick: 'data-exposure-click', // 标识是否是点击事件
      // exModule,自定义数据缓存module名称;
      // exClick 自定义是否给改曝光节点绑定点击曝光事件;
      // exInter 自定义是否需要交叉观察器曝光
      arrParams: ['exClick', 'exModule', 'exInter'],
      vp: location.href, // 当前页面url
      rp: document.referrer, // 页面来源url
      elemObj: {}, // 全局缓存需要曝光的节点 储存对象，具体是模块名称对于缓存数组
      fixObj: {}, // 缓存部分位置的固定高度，这里也是按模块名称设置的,
      exModuleObj: {}, // 缓存带有模块名称的信息
      intersect: null, // 引入交叉观察器，解决部分曝光问题。这里一旦使用交叉观察曝光，就不再满足可视50%这个条件。暂时技术限制
      sendRecordArr: [], // 这里是临时数组，每隔100毫秒清空一次数组，集中处理数据
      /**
       * @desc 更加节点获取url信息
       * @param elem {element} 传入的节点
       * @param attr {string} 传入attr值
       * @return url
       */
      getElemUrl: function (elem, attr) {
        var that = this;
        attr = attr || that.attr;
        var url = elem.attr(attr) || '';
        var params = null;
        if (url === 'true') url = '';
        var mArr = url.match(/^\[(.*)\]$/);
        if (mArr && mArr[1]) {
          params = {};
          // 获取参数信息，这里自定义了三个参数
          $.each(that.arrParams, function (n, key) {
            var val = that.getUrlParam('?' + mArr[1], key);
            if (val) {
              params[key] = val;
            }
          });
          url = '';
        }
        if (!url) {
          // 如果是a标签
          if (elem[0].tagName.toLowerCase() === 'a') {
            url = elem.attr('href') || ''
          } else {
            if (elem.find('a').length) {
              // 查找子标签
              url = elem.find('a').attr('href') || ''
            }
          }
        }
        // url合并参数
        if (url && params) {
          url = url + (url.indexOf('?') === -1 ? '?' : '&');
          $.each(params, function (key, val) {
            url = url + key + '=' + val + '&';
          });
          url = url.replace(/(.*)\&$/, '$1');
        }
        return url;
      },
      /**
       * @desc 解析页面曝光位置, 可以单独调用，对一些后续加载数据位置进行解析曝光
       * @param exModule {string} 需要删除的模块名称
       * @return undefined
       */
      analysisRecord: function (exModule) {
        var that = this;
        var attr = that.attr;
        var recordElem = $('[' + attr + ']');
        // 如果传入模块名称，那边就是要先删除该模块名下的所有曝光数据
        if (exModule && that.elemObj[exModule]) {
          that.elemObj[exModule] = []; // 清空数据
        }
        // 设置交叉观察器对象
        that.setIntersectObj();
        // 开始循环整个获取到的曝光节点
        recordElem.each(function (n) {
          var elem = $(this);
          var attrStr = elem.attr(attr); // 获取attr信息
          var url = that.getElemUrl(elem);
          var info = that.getSendInfo(url); // 获取曝光链接的信息
          // 有pid 或者bid ,或者推荐位rmmds的才进行压入曝光数组
          if (info.pid || info.bid || info.rmmds) {
            // 只有符合曝光条件
            // 这里主要是限制了设置exModule下的节点
            if (that.exModuleRecord(info) !== false) {
              // 如果开启了交叉观察器曝光，就不再压入elemObj缓存数组
              if (info.exInter && that.intersect) {
                // 开始监听
                that.intersect.observe(elem[0]);
              } else {
                var mod = info.exModule || 'common'; // 默认是模块名称是common
                var elemArr = that.elemObj[mod];
                if (!elemArr) { // 当前模块数组不存在，就赋值为空数组
                  elemArr = that.elemObj[mod] = [];
                }
                info.elem = elem;
                elemArr.push(info);
              }
            }
            // 注册点击事件//不能注释，attrClick能作为标记给新api使用
            if (info.exClick !== 'false') { // 如果链接带有exClick 且等于false不绑定点击事件。默认都是绑定的。
              elem.attr(that.attrClick, attrStr)
            }
          }
          // 清除data标识
          elem.removeAttr(attr);
        });
        // 注册曝光记录，默认执行一次函数
        that.registerRecord();
      },
      /**
       * @desc 对曝光位置进行判断。如果上下可视超过50%就发送曝光请求
       * @param exModule {string} 模块名称
       * @return undefined
       */
      elemExOpr: function (exModule) {
        var that = this;
        var sTop = $(window).scrollTop(); // 获取页面当前滚动高度
        var winHt = $(window).height(); // 获取页面当前可视窗口高度
        var tempArr = []; // 临时储存arr
        var arr = that.elemObj[exModule]; // 获取需要曝光模块的数据
        if (arr && arr.length) {
          $.each(arr, function (n, info) {
            var top = info.elem.offset().top; // 该曝光位置的距页面顶部高度
            var ht = info.elem.height(); // 该曝光位置的节点高度
            var ft = that.fixObj.common || 0; // 计算需要忽略掉的fix高度值
            if (exModule !== 'common') {
              ft += that.fixObj[exModule] || 0; // 叠加fix值
            }

            // 当前节点有高度才曝光
            if (ht > 1) {
              // 判断条件
              // sTop + winHt >= top + ht / 2 主要判断 曝光位置 上方是否可视超过50%
              // sTop <= top + ht / 2 判断曝光位置下方是否可视超过50%
              // 这里减去ft 就是减去固定的fix叠加值。因为滑动块从下往上滑时。如果顶部有fix固定位置高度。需要相对应减去
              // var judge = sTop + winHt >= top + ht / 2 && sTop <= top + ht / 2 - ft;
              var judge;
              if (top > ft) {
                judge = sTop + winHt >= top + ht / 2 && sTop <= top + ht / 2 - ft;
              } else if (top <= ft) {
                judge = sTop + winHt >= top + ht / 2;
              }
              // 开始曝光
              if (judge && window.nDC && nDC.collectBanner) {
                // 处理带有module名称的曝光
                that.exModuleOpr(info);
                // 发送可视曝光
                // that.sendRecord(info);
                // 把已曝光的数据压入缓存,集中发送，减少并发数
                that.sendRecordArr.push(info);
              } else {
                // 没有曝光的压入临时数组
                tempArr.push(info);
              }
            } else {
              // 没有高度值的压入临时数组
              tempArr.push(info);
            }
          });
          // 重新赋值当前模块下的曝光数据，已曝光的位置被剔除
          that.elemObj[exModule] = tempArr;
          // 集中发送数据
          that.collectSendInfo()
        }
      },
      /**
      * @desc 这里间隔100毫秒，集中发送曝光数据，目的减少并发量
      * @param undefined
      * @return undefined
      */
      collectSendInfo: function () {
        var that = this;
        // 每执行一次 清空缓存数组 这里主要是处理了曝光数据集中发送的问题
        // 减少频繁执行
        clearTimeout(that.sendCollectTimer);
        // 间隔100毫秒
        that.sendCollectTimer = setTimeout(function () {
          var arr = [];
          $.each(that.sendRecordArr, function (n, info) {
            if (info.bid || info.pid || info.rmmds) {
              arr.push('"' + (info.rmmds || '') + '|' + (info.bid || '') + '|' + (info.pid || '') + '"');
            }
          });
          if (arr.length) {
            var str = '[' + arr.join(',') + ']';
            // 集中发送数据
            that.sendRecord({ str: str });
          }
          // 每次发送后都清空数组
          that.sendRecordArr = [];
        }, 100);
      },
      /**
       * @desc 对节点信息进行分析，如果已经曝光过的带有exModule名称的就不再压入缓存
       * @param info {object} 传入节点信息
       * @return {boolean} 输出等于false时就不需要压入缓存
       */
      exModuleRecord: function (info) {
        var that = this;
        var exModule = info.exModule
        var arr;
        if (exModule) {
          arr = that.exModuleObj[exModule];
          if (arr && $.inArray(info.url, arr) > -1) {
            return false;
          }
        }
      },
      /**
       * @desc 对设有模块名称的曝光节点做处理
       * @param info {object} 传入节点信息
       */
      exModuleOpr: function (info) {
        var that = this;
        var url = info.url;
        if (info.exModule) {
          var arr = that.exModuleObj[info.exModule];
          if (!arr) {
            arr = that.exModuleObj[info.exModule] = [];
          }
          if ($.inArray(url, arr) === -1) {
            // 压入数组
            arr.push(url);
          }
        }
      },
      /**
       * @desc 设置交叉观察器对象
       * @return undefined
       */
      setIntersectObj: function () {
        var that = this;
        // 这里引入交叉观察器。解决部分地方无法曝光的问题。加上[exInter=true]就可以走这个通道
        if (!that.intersect && window.IntersectionObserver) {
          that.intersect = new IntersectionObserver(function (entries, observer) {
            $.each(entries, function (n, entry) {
              if (entry.intersectionRatio > 0) {
                var target = entry.target;
                // 移出观察器
                observer.unobserve(target);
                // 获取链接
                var url = that.getElemUrl($(target), that.attrClick);
                var info = that.getSendInfo(url);
                // 处理带有模块名的曝光节点
                that.exModuleOpr(info);
                // 发送曝光
                // that.sendRecord(info)
                // 压入缓存，集中发送
                that.sendRecordArr.push(info);
                // 立即执行
                that.collectSendInfo()
              }
            })
          })
        }
      },
      /**
       * @desc 初始化函数,默认全局调用一次，能够有效解析对应已做了data标识的曝光位置
       * @return undefined
       */
      initRecord: function () {
        var that = this;
        // that.removeRecord();
        // 开始解析页面
        that.analysisRecord();
        $(document).on('scroll', that.registerRecord);
      },
      /**
       * @desc 注册曝光函数，这里主要是处理了停留.5s,并循环曝光缓存数据
       * @return undefined
       */
      registerRecord: function () {
        var that = NCrecord;
        // 清除settimeout
        clearTimeout(that.scrollTimer);
        // 停留0.5秒检测页面
        // 全局缓存setTimeout 对象
        that.scrollTimer = setTimeout(function () {
          // 每次滚动计算头部fix高度
          // 这个是yoins pc端的头部fix固定，因为滑动时会有变化，所以每次都计算一下这个固定的高度
          that.setFixTop('.index_head_cont');
          // 循环曝光缓存对象
          $.each(that.elemObj, function (exModule) {
            // 执行对应的模块数组信息
            that.elemExOpr(exModule);
          })
        }, 500);
      },
      /**
       * @desc 注销曝光事件，pc页面一般调用不到
       * @return undefined
       */
      removeRecord: function () {
        var that = NCrecord;
        that.elemObj = {}; // 清空缓存
        that.fixObj = {}; // 清空高度
        // 解绑滚动事件
        $(document).off('scroll', that.registerRecord);
      },
      /**
       * @desc 调用发送曝光接口。这里主要是调用了dc那边提供的collectBanner函数
       * @param info {object|string} 每个曝光位置的信息,可以传入链接。
       * @param click {boolean} 是否是点击曝光。这里如果不传值，那么就是click点击曝光。如果传true就是show可视曝光
       */
      sendRecord: function (info, exClick) {
        var that = this;
        if (typeof info === 'string') {
          // 解析url信息
          info = that.getSendInfo(info);
          info.str = '['+'"' + (info.rmmds || '') + '|' + (info.bid || '') + '|' + (info.pid || '') + '"'+']';
        }
        // 发送接口
        if (info.pid || info.bid || info.rmmds || info.str) { // info.str 是集中发送数据
          var params = {
            ac: exClick ? 'click' : 'show',
            callback: 'nDCRecordExposure',
            vp: encodeURIComponent(that.vp),
            rp: encodeURIComponent(that.rp)
          }
          info.str && (params.info = info.str)
          window.nDC && nDC.collectBanner && nDC.collectBanner(params)
        }
      },
      /**
       * @desc 设置部分模块的fix高度
       * @param num {string|number} 数值或者selector
       * @param exModule {string} 可选模块名称。默认是common
       * @return undefined
       */
      setFixTop: function (num, exModule) {
        var that = this;
        exModule = exModule || 'common';
        // 如果传入数值
        if (typeof num === 'number') {
          that.fixObj[exModule] = num;
        }
        // 传入字符串
        if (typeof num === 'string') {
          var elem = $(num);
          if (elem.length) {
            // 获取节点高度
            that.fixObj[exModule] = elem.height() || 0;
          }
        }
      },
      /**
       * @desc 解析url信息
       * @param url {string} 需要解析的链接
       * @return {object} 返回相关的对象数据
       */
      getSendInfo: function (url) {
        var that = this;
        if (!url) return {};
        var pid = that.getUrlPid(url); // 获取产品pid
        var bid = that.getUrlParam(url, 'bid'); // 获取广告位bid
        var rmmds = that.getUrlParam(url, 'rmmds'); // 获取推荐位rmmds
        var params = { url: url, pid: pid, bid: bid, rmmds: rmmds };
        // 获取自定义参数
        $.each(that.arrParams, function (n, key) {
          var val = that.getUrlParam(url, key);
          if (val) {
            params[key] = val;
          }
        });
        return params;
      },
      /**
       * @desc 获取链接参数信息
       * @param url {string} 传入的url
       * @param str {string} 需要获取的参数值
       * @return {string} 参数内容
       */
      getUrlParam: function (url, str) {
        var reg = new RegExp('[?&]' + str + '=([^&]*)', 'i');
        var arr = url.match(reg);
        return (arr && arr[1]) ? arr[1] : '';
      },
      /**
       * @desc 设置部分模块的fix高度
       * @param url {string} 传入的url
       * @return {string} pid值
       */
      getUrlPid: function (url) {
        var arr = url.match(/p-(\d+).html/i);
        return (arr && arr[1]) ? arr[1] : '';
      }
    };

    // DOMContentLoaded后开始全局初始化
    $(function () {
      // 手动发送曝光
      $.extend({
        sendExposureManualiy: function (url, callback) {
          var urlObj = $.queryToObject(url);
          if (urlObj.pid || urlObj.bid || urlObj.rmmds) {
            setTimeout(function () {
              NCrecord && NCrecord.sendRecord(url);
              callback && callback();
            }, 500)
          }
        },
        sendExposureManualiyArr: function (urlArr, callback) {
          var arr = [];
          var sendArr = urlArr.map(function (url) {
            return NCrecord && NCrecord.getSendInfo(url)
          });
          $.each(sendArr, function (n, info) {
            if (info.bid || info.pid || info.rmmds) {
              arr.push('"' + (info.rmmds || '') + '|' + (info.bid || '') + '|' + (info.pid || '') + '"');
            }
          });
          if (arr.length) {
            var str = '[' + arr.join(',') + ']';
            // 集中发送数据
            NCrecord && NCrecord.sendRecord({ str: str });
          }
        }
      })
      // 曝光页面
      NCrecord.initRecord();
      // 发送点击曝光
      $(document).on('mousedown', '[' + NCrecord.attrClick + ']', function (event) {
        var url = NCrecord.getElemUrl($(this), NCrecord.attrClick)
        NCrecord.sendRecord(url, true);
      })
    })
  }
});