;(function(){
    $.quickBuy = {
        data: [], // 本地保存获取到的数据
        init: function(){
            new Slide();
            $.fn.lazyload && $('.img-list-container .img-box img, .img-big-container img').lazyload();
            this.bindEvent();
            this.bindZoom();
            this.resetImgCntSize();
        },
        bindEvent: function(){
            $('.goods_main_attr .color li').hover(function() {
                var $this = $(this);
                changeBigpicTimer && clearTimeout(changeBigpicTimer);
                this.timer = setTimeout(function() {
                    if ($this.find('img').length > 0) {
                        $.changeAttrImage($this.find('img')[0]);
                    }
                }, 100);

            }, function() {
                this.timer && clearTimeout(this.timer);
                changeBigpicTimer = setTimeout(function() {
                    $.changeAttrImage($('.goods_main_attr .color li.active img')[0]);
                }, 2000);

            });

            //无poa可选
            if ($(".goods_main_attr li").length == 0) {
                $.stockMessage();
            }

            $(".goods_main_attr li").click(function() {
                var $this = $(this);
                if ($this.hasClass('gray')) {
                    return;
                }
                if ($this.hasClass('out_stock')) {
                    $this.removeClass('active');
                    return;
                }

                if ($this.hasClass('active')) { // 取消选中状态
                    $this.removeClass('active').find('i').remove();
                    $('.status', '.pro-detail-container').html('');

                    if (!$(".goods_main_attr li.active").length) {
                        $(".goods_main_attr li.out_stock").filter(function () { return !$(this).hasClass('out_stock_default');}).removeClass('out_stock');
                    }
                    $(".goods_main_attr li.active").siblings('.out_stock').filter(function () { return !$(this).hasClass('out_stock_default');}).removeClass('out_stock');
                    if ($this.closest('ul').hasClass('size')) {
                        // $('.sizeText[size="' + $(this).attr('value_name') + '"]').hide();
                        $('.sizeText').hide();
                    }

                    // 清除状态
                    $('.addcart').removeClass('gray');
                    $('.addcart').each(function () {
                        var btn = $(this).attr('mtitle');
                        $('b',$(this)).html('<i></i>' + btn);
                    })


                    // 还原数量
                    $('#maximum').html($('#maximum').attr('str') + ': ' + $('#maximum').data('default'));

                    // $('.shipping-time-msg', '.pro-detail-container').html($('.shipping-time-msg', '.pro-detail-container').data('defaultMsg'));
                    $('.shipping-time-msg', '.pro-detail-container').html($('.shipping-time-msg-temp-js', '.pro-detail-container').html());

                    $.vidCheckPoa();
                    return;
                }

                $this.addClass('active')
                    .append('<i/>')
                    .siblings().removeClass('active')
                    .find('i').remove();
                if ($this.find('img').length > 0) {
                    $.changeAttrImage($this.find('img')[0]);
                }
                $.when($.getUsefulPoa($this.attr('value_id'))).then(function () {
                    $.showAttrDesc();
                    $.stockMessage();
                    $.validateIsSel();
                });

            });

            $(".goods_main_list .size_list_box .list li").click(function() {
                $.selConversion($(this));
            });

            $(".goods_main_list .size_list_box").mouseenter(function () {
                var o = $(".goods_main_list .size_list_box .list");
                o.show();
            }).mouseleave(function () {
                var o = $(".goods_main_list .size_list_box .list");
                o.hide();
            });
            $(".goods_main_list .size_list_box .cy_list li").click(function() {
                var o = $(".goods_main_list .size_list_box .list");
                if (o.is(":hidden")) {
                    o.show();
                } else {
                    o.hide();
                }
                $.getSelectedOptions(true);
            });

            var showChats = function () {
                ZSdialog({
                    title: '',
                    width: Math.min($(window).width() * 0.8, 800),
                    height: 474,
                    content: $('.size-charts-wrap').clone().show(),
                    skin: 'dialog-size-charts',
                    onshow: function () {
                        $('.size-charts-wrap', this.node).uniform();
                        $(':radio[name="radio-chart-size"]:first', '.size-charts-wrap').click();
                        if ($.cookie("is_show_conversionSize") == 1) {
                            $('.conversion_size').show();
                        };
                        $('.zs-dialog-content .nav-tabs-chart').addClass('clearfix');
                        if ($('.zs-dialog-content .nav-tabs-chart li:visible').length <= 1) {
                            $('.zs-dialog-content .tab-pane_title').hide();
                        };
                        $('.zs-dialog-content .nav-tabs-chart li').css({ 'width': (1 / $('.zs-dialog-content .nav-tabs-chart li:visible').length) * 100 + '%' });

                        // $('body').addClass('body-no-scroller');//点击关闭按钮移除
                        $('.zs-dialog-body .detail-slider-box-js').mCustomScrollbar({
                            scrollInertia: 200,
                            theme: 'dark',
                            scrollButtons: {
                                enable: false
                            },
                            advanced: {
                              updateOnContentResize: true
                            },
                            mouseWheel: {
                              preventDefault: true
                            }
                        });
                    }
                }).showModal();
            };
            $('.size_chart_anchor a').click(function () {
                showChats();
            });

            $.iniSize();
            $.iniTableType();
        },
        getMoal: function($obj, id, callback){
            var result = this.filter(id);
            if (result.status) {
                this.showMoal(result.html, callback);
                this.init();
                //更换币种
                var currency = $.setCurrency.getCookieCurrency();
                $.setCurrency.doSelCurrency(currency);
                return;
            }
            var self = this;
            $.ajax({
                type: 'get',
                url: '/api/ajax/ajaxBuyNowDetails/',
                dataType: 'json',
                data: {
                    products_id: id
                },
                beforeSend: function(){
                    $obj.loading();
                },
                success: function(res){
                    //reddit event
                    window.dataLayer.push({
                        'event': 'reddit-product-trigger'
                    })
                    var html = res.html;
                    if (res.error == 0) {
                        self.showMoal(html, callback);
                        self.init();
                        self.data.push({id: id, html: html});
                    } else {
                        $.msg(res.msg)
                    }
                    // facebook统计代码
                    dataLayer.push({
                        'event': 'facebook-event-trigger',
                        'facebook-event-name': 'ViewContent',
                        'facebook-event-params': ''
                    })
                },
                error: function(xhr, err){
                    console.log(err);
                },
                complete: function(){
                    $obj.loading(0);
                }
            }).then(function(){
                var currency = $.setCurrency.getCookieCurrency();
                $.setCurrency.doSelCurrency(currency);
            });
        },
        showMoal: function(html, callback){
            var $quickBuy = $('#quick_buy');
            if ($quickBuy.length) {
                $quickBuy.show().find('.inner').html(html);
            }else {
                $('body').append('<div id="quick_buy"><div class="quick-buy-box-container"><div class="inner pro-detail-container resize-quick-buy-container">'+ html +'</div><div class="mask"></div></div></div>');
            }
            $('#quick_buy').find('.show-product-price-register-coupon-js').length > 0 && $('#quick_buy').find('.show-product-price-register-coupon-js').removeClass('hidden');
            callback && callback($quickBuy)
        },
        /**
         * 判断正方形图片，重置图片显示区域高度
         */
        resetImgCntSize: function() {
            var resetHeight = 429,
                resetSlideHeight = 379;
            var ImgContainer = $('#imgContainer'),
                imgListContainer = $('#imgListContainer'),
                imgActive = ImgContainer.find('img'),
                imgListContainerList = imgListContainer.find('.img-box'),
                imgUrl = imgActive.attr('data-original');
            var img = new Image();
                img.src =  imgUrl;
            img.onload = function(){
                if (imgActive.width() == imgActive.height()) {
                    ImgContainer.css({ height: resetHeight + 'px' })
                    imgListContainer.attr('style', 'height:'+ resetHeight + 'px !important;')
                    imgListContainerList.attr('style', 'height:'+ resetSlideHeight + 'px !important;')
                }
            }
        },
        bindZoom: function(){
            var data = {
                    thumb_image_width: 480,
                    thumb_image_height: 640,
                    scale_width: 225,
                    scale_height: 300
                };
            if ($('.pro-detail-container.prod-square-container').length) {
                $.extend(data, {
                    thumb_image_width: 600,
                    thumb_image_height: 600
                });
            }
            var img = new Image();
            img.src = $('.img-big-container .img img').data('original');

            img.onload = function () {
                var width = img.width;
                if (width / $('.img-big-container').width() < 1.5) {
                    data.scale_width = 300;
                    data.scale_height = 400;
                }
                // $('.img-big-container').zoom(data);

            };
        },
        filter: function(id){
            var data = this.data,
                result = {status: false, html: ''};
            if (data.length > 0) {
                $.each(data, function(index, item){
                    if (item.id == id) {
                        result = {status: true, html: item.html};
                    }
                });
            }
            return result;
        }
    };

    $(document).on('click', '.lst_ul .car_btm a', function(){
        var $this = $(this),
            id = $this.attr('data-id');
        $.quickBuy.getMoal($this, id, function () {
            //快速加购发送对应详情页的访问次数和UV
            Rd && Rd.sendPageVisitRecord(window.location.href, $this.attr('data-product-src'))
        });
    })
    .on('click', '#quick_buy .mask, #quick_buy .nc-icon-close', function(){
        $('#quick_buy').hide();
    }).on('click','.product-price-get-register-coupon-js',function(){
        if ($(this).hasClass('new-user')) {
            $.signUser.getSignHtml();
            ga('send', 'event', 'Product', 'click', 'right_Coupon_button_190612');
            if (typeof (JGData) != 'undefined') {
              JGData.sendRec({ 'point_id': 19161214847 });
            }
          } else if ($(this).hasClass('received')) {
            ga('send', 'event', 'Product', 'click', 'right_CouponAfterLogin_button_190612');
            if (typeof (JGData) != 'undefined') {
              JGData.sendRec({ 'point_id': 19178024619 });
            }
            window.open('/account/my_coupons.html')
          }
    });
})();

var changeBigpicTimer;

function Slide (options) {
    this.init(options);
}
$.extend(Slide.prototype, {
    init: function (options) {
        this.options = $.extend({
            index: 0,
            showItem: $('.prod-square-container').length ? 7 : 6,
            container: '.img-list-container .img-list',
            prev: '.img-list-container .prev',
            next: '.img-list-container .next'
        }, options);
        this.index = this.options.index;
        this.$container = $(this.options.container);
        this.length = this.$container.children().length;
        this.scrollHeight = this.$container.children().eq(0).outerHeight() + parseInt(this.$container.children().eq(0).css('margin-bottom'));
        this.options.prev && (this.$prev = $(this.options.prev));
        this.options.next && (this.$next = $(this.options.next));
        this.slide();

        var defaultImg = $('.img-big-container .img img', '.pro-img-container').data('original');
        $('.img img[data-big-img="' + defaultImg + '"]', this.$container).closest('.item').addClass('active');
    },
    slide: function () {
        this.format();
        this.bindEvent();
    },
    format: function () {
        var me = this,
            options = this.options,
            changeBtn = function (elmStr, display/*boolean*/) {
                me['$' + elmStr] && me['$' + elmStr][display ? 'removeClass' : 'addClass']('disabled');
            };
        if (this.index === 0 || this.length <= this.options.showItem) {
            changeBtn('prev', false);
        } else {
            changeBtn('prev', true);
        }
        if (this.length - this.options.showItem - this.index <= 0  || this.length <= this.options.showItem){
            changeBtn('next', false);
        } else {
            changeBtn('next', true);
        }


    },
    bindEvent: function () {
        var me = this;
        if (this.$prev) {
            this.$prev.bind('click', function () {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                me.index -= 1;
                me.$container
                    .stop(true,true)
                    .animate({'margin-top':'+=' + me.scrollHeight + 'px'}, 200);
                me.format();
            });
            this.$prev.bind('mouseenter', function () {
                this.timer = setTimeout(function () {
                    me.$prev.trigger('click');
                }, 100);
            }).bind('mouseleave', function () {
                this.timer && clearTimeout(this.timer);
            });
        }
        if (this.$next) {
            this.$next.bind('click', function () {
                if ($(this).hasClass('disabled')) {
                    return;
                }
                me.index += 1;
                me.$container
                    .stop(true,true)
                    .animate({'margin-top':'-=' + me.scrollHeight + 'px'}, 200);
                me.format();
            });
            this.$next.bind('mouseenter', function () {
                this.timer = setTimeout(function () {
                    me.$next.trigger('click');
                }, 100);
            }).bind('mouseleave', function () {
                this.timer && clearTimeout(this.timer);
            });
        }

        this.$container.on('mouseenter', '.item', function () {
            var imgUrl = $('img', this).data('big-img'),
                $imgContainer = $('.img-big-container'),
                $item = $(this);
            // changeBigpicTimer && clearTimeout(changeBigpicTimer);
            if ($('.img-big-container img.big').attr('src') === imgUrl) {
                return;
            }
            this.timer = setTimeout(function () {
                $imgContainer.loading(true, 'big');
                $item.addClass('active').find('.img').loading(true).end()
                     .siblings().removeClass('active')
                                .find('.img').loading(false);
                $('.img-big-container img.big').attr('src', imgUrl).data('original', imgUrl);
                var img = new Image();
                img.src = imgUrl;
                img.onload = function () {
                    $imgContainer.loading(false);
                    $('.img', $item).loading(false);
                };
            }, 100);
        }).on('mouseleave', '.item', function () {
            this.timer && clearTimeout(this.timer);
        });

        $('.pro-img-container').on('mouseenter', function () {
            // changeBigpicTimer && clearTimeout(changeBigpicTimer);
        }).on('mouseleave', function () {
            changeBigpicTimer = setTimeout(function() {
                var $img = $('.goods_main_attr .color li.active img');
                if ($img.length) {
                    $('.etalage_magnifier').hide();
                    $.changeAttrImage($img[0]);
                }
            }, 2000);
        })


    }
});

$.extend({
    //初始化size选中
    iniSize: function() {
        var leng = $(".goods_main_list .size_list_box .list li").length;
        if (leng > 0) {
            var type = $('#table_type').val();
            var sizeType = $.cookie(type);
            var $a = $('.goods_main_list .size_list_box .list li a[size="' + sizeType + '"]');

            if ($a.length) {
                $.selConversion($a.closest('li'));
            }
            // $(".goods_main_list .size_list_box .list li").each(function() {
            //  if ($(this).find('a').attr('size') == sizeType) {
            //      $.selConversion($(this));
            //  }
            // });
        }
    },
    //初始化size table type
    iniTableType: function() {
        var tableType = $('#table_type').val();
        if (tableType) {
            var sizeType = $.cookie(tableType);
            $(".goods_main_list .size_list_box .list li").each(function() {
                if ($(this).find('a').attr('size') == sizeType) {
                    $.selConversion($(this));
                }
            });
            if (!sizeType) {
                $.ajax({
                    type: 'GET',
                    dataType: 'HTML',
                    url: homeUrl + 'api/ajax/initTableType/',
                    success: function() {
                        $.iniSize();
                        var sizeType = $('#sizeText').attr('size');
                        var $a = $('.goods_main_list .size_list_box .list li a[size="' + sizeType + '"]');
                        $a.length && $.addInches($a.closest('li'));
                    }
                });
            }
        }
    },
    //点击有图片的属性切换主图区域
    changeAttrImage: function(img) {
        var viewImage = $(img).attr('largeimage'),
            $container = $('.img-big-container .img');
        if (!viewImage) {
            return;
        }
        $container.loading(true, 'big');
        $('img', $container).attr({
            'data-original': viewImage,
            'src': viewImage
        }).data('original', viewImage);
        var img = new Image();
            img.src = viewImage ;
            img.onload = function () {
                $container.loading(false);
            };
        $('.goods_photo_min .box').find('li.active').removeClass('active')
            .find('img[ref="' + viewImage + '"]').parent().addClass('active');
        $('.img-list-container .img-list img[data-big-img="' + viewImage + '"]').closest('li')
            .addClass('active')
            .siblings().removeClass('active');

    },
    // 显示属性描述信息
    showAttrDesc :function () {
		$.showTooltip();
		return;
        var sizeJson = $.sizeToJsonSize();
        var tableType = $('#table_type').val();
        var $size,
            $cupSize,
            sizeText = '',
            csize = null,
            sizearrObj = null;

        var attrSize = ''; // 多个size

        var sizeType = tableType ? $.cookie(tableType) : false;

        var arrayCvs = [];

        var replaceCvs = function (arr) {
            var metra,
                replaceData;
            if ($.type(arr) === 'array' && arr.length === 2) {
                metra = arr[0];
                replaceData = arr[1].split(',');
                return metra.replace('%cup%', replaceData[0]).replace('%oricup%', replaceData[1]);
            } else {
                return arr;
            }
        };

        if (($size = $('.goods_main_attr[option_id="380"] li.active, .goods_main_attr[option_id="396"] li.active')).length) {
            sizeText = $size.attr('value_name') || "";
            csize = sizeText.toLowerCase();
            sizearrObj = csize.split("-");
            attrSize = csize;
            if(sizearrObj[1]){
                sizeJson[csize] = sizeJson[sizearrObj[0]]+'-'+sizeJson[sizearrObj[1]];
            }
            sizeType && arrayCvs.push( $('#size_' + sizeType + '_' + sizeText).html());
        }
        if (($cupSize = $('.goods_main_attr[option_id="404"] li.active')).length) {
            attrSize += $cupSize.attr('value_name');
            sizeType && arrayCvs.push( $('#size_' + sizeType + '_' + $cupSize.attr('value_name')).html());
        }

        var $sizeText = null;
        //sizeText = $.trim(sizeText.replace('<i></i>',''));
        $('.sizeText').hide().each(function() {
            var tmpText = $(this).attr('size').toLowerCase();

            if (tableType && (tmpText == attrSize.toLowerCase() || tmpText == sizeJson[csize])) {

                $(this).find('.conversion').html(replaceCvs(arrayCvs));
                $sizeText = $(this);
                // $(this).show();
            } else {

                if (sizeJson[tmpText] == sizeText.toLowerCase()) {
                    $sizeText = $(this);
                    // $(this).show();
                }
            }
        });

        $.showTooltip();
    },
    //查询库存信息
    stockMessage: function() {
        if (!$.validateSelOptions()) {
            return false;
        }
        //英国报关链接
		if($('.product-addcart-js').hasClass('DsbqgBg23') && window.productViewI18n && window.productViewI18n.LC_STOCK_MSG_SOLD_OUT){
			return false;
		}
        var sku = $('#sku').val();
        var curWarehouse = 'CN';
        var products_id = $('#products_id').val();
        if (!products_id) {
            return;
        }

        var divID = 'stockMsg_' + curWarehouse;
        var data = 'sku=' + encodeURIComponent(sku);
        data += '&warehouse=' + curWarehouse;
        data += '&products_id=' + products_id;

        //Get selected options
        var selOptions = $.getSelectedOptions();
        if (selOptions.valueIds.length > 0) {
            for (var i = 0; i < selOptions.valueIds.length; i++) {
                data += '&value_ids[]=' + selOptions.valueIds[i];
                divID += '_' + selOptions.valueIds[i];
            }
        }
        if ($('#' + divID).html()) {
            if ($('#' + divID).html().length > 0) {
                $.stockMessageCallback(divID, true);
                return true;
            }
        }

        //loadding
        $('.shipping-time-msg', '.pro-detail-container').parent().loading(true);

        $.ajax({
            url: '/api/product/stockMessage/',
            type: 'get',
            data: data,
            dataType: 'json',
            beforeSend: function() {
                $('#isCheckStock').val(1);
            },
            success: function(result) {
                $('#isCheckStock').val('');
                var vHtml = $.vidToVids(result.vids);
                //计算币种转换
                var currency = $.setCurrency.getCookieCurrency();
                var nowFinalPrice = result.final_price; //$.setCurrency.getPriceByCurrency(result.final_price_usd, currency);
                var nowPrice = result.price; //$.setCurrency.getPriceByCurrency(result.price_usd, currency);
                var nowFormatPrice = $.setCurrency.getPriceByCurrency(result.price_usd, currency, true);
                $('#stockMsgCache').append('<div id="' + divID + '" stocks="' + result.stocks + '" clearStock="' + result.clearStock + '" limitProduct="'+result.limitProduct+'" showStocks="'+result.showStocks+'" otherSataus="' +result.otherSataus+ '" clearStockMsg="' + result.clearStockMsg + '" minumum="' + result.buyMinNums + '" product_type="' + result.list_type + '"  discount="' + result.discount + '" points="' + result.points + '" hideBuy="' + result.hideBuy + '" oriPrice="' + result.price_usd + '" oriFinalPrice="' + result.final_price_usd + '" price="' + nowPrice + '" format_price="' + nowFormatPrice + '" final_price="' + nowFinalPrice + '" stockTip="' + result.stockTips + '" ' + '" ' + vHtml + '>' + result.message + '</div>');
                // $.stockMessageCallback(divID);
                $.stockMessageCallback(divID,true);
            },
            complete: function () {
                $('.shipping-time-msg', '.pro-detail-container').parent().loading(false);
            }
        });
    },
    validateIsSel: function() {
        var optionList = $('.goods_main_attr');
        var i = 0;
        optionList.each(function() {
            var temp = parseInt($(this).attr('attr_data'));
            if (!temp) {
                i++;
            }
        });
        // var hasWarn = $(".info_title_nc").hasClass("info_title");
        var click_flg = parseInt($(".info_title_nc").attr('flg'));
        if (i >= 1 && click_flg) {
            if (timer) {
                clearTimeout(timer);
                $(".info_title_nc").removeClass("active");
            }

            $(".info_title_nc").addClass("info_title active");
            $(".info_title_nc .title_h1").show();

            var timer = setTimeout(function(){
                $(".info_title_nc").removeClass("active");
            }, 1000);
        }
        if (!i) {
            $(".title_h1").hide();
            $(".info_title_nc").removeClass("info_title");
        }
        return;
    },
    // 获取属性的poa 只获取一次
    getUsefulPoa: function (poaValue) {
        var $elm = $('[value_id="' + poaValue + '"]');
        if (!$elm.length) {
            return true;
        }
        if ($elm.data('poalist')) {
            return $elm.data('poalist');
        }
        var dtd = $.Deferred();
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: '/api/product/vidCheckPoa/',
            data: {
                'vid': poaValue,
                'products_id': $('#products_id').val()
            },
            success: function(result) {
                $elm.data('poalist', result[poaValue]);
                dtd.resolve(result[poaValue]);
            },
            error: function () {
                dtd.reject();
            }
        });
        return dtd.promise();

    },
    //单属性检查多属性poa是否存在
    vidCheckPoa: function() {
        var addStock = function ($elm) {
            if ($('img', $elm).length && !$('span', $elm).length) {
                $elm.append("<span></span>");
            }
            $elm.addClass('out_stock');
        };
        $('.goods_main_attr li.active').each(function () {
            var _attr = $(this).closest('.goods_main_attr')[0],
                poalist = $(this).data('poalist');
            if (!poalist) {
                return;
            } else {
                var $list = $('.goods_main_attr').filter(function () {
                    return this !== _attr;
                }).find('li[value_id]').filter(function () {
                    return !$(this).hasClass('out_stock_default');
                }).removeClass('out_stock');
                $list.each(function () {
                    if (poalist.indexOf($(this).attr('value_id')) === -1) {
                        addStock($(this));
                        this.stockout = true;
                    }
                });
            }
        });
        $('.goods_main_attr li').each(function () {
            if (this.stockout) {
                this.stockout = false;
                addStock($(this));
            }
        });

        switch($('.goods_main_attr li.active').length) {
            case 0:
                $('.goods_main_attr li:not(.out_stock_default)').removeClass('out_stock');
                break;
            case 1:
                $('.goods_main_attr li.active').siblings(':not(.out_stock_default)').removeClass('out_stock');
                break;
        }
        return;

        var optionList = $('.goods_main_attr');
        var length = optionList.length;
        if (length <= 1) {
            return;
        }
        var activeLen = 0;
        var vid = 0;
        optionList.find('li').each(function() {
            if ($(this).hasClass('active')) {
                vid = $(this).attr('value_id');
                activeLen++;
            }
        });
        if (activeLen > 1) {
            return;
        }

        var products_id = $('#products_id').val();
        if (!vid || !products_id) {
            return;
        }
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: homeUrl + 'api/product/vidCheckPoa/',
            data: {
                'vid': vid,
                'products_id': products_id
            },
            success: function(vids) {
                var length = $('.goods_main_attr').length;
                if (length > 3) {
                    return;
                }

                var node = $("li[value_id^=" + vid + "]").parent().parent();
                var opid = node.attr('option_id');

                $('.goods_main_attr').each(function() {
                    if ($(this).attr('option_id') != opid) {
                        var oNode = $(this);
                        oNode.find('li').each(function() {
                            if ($(this).hasClass('out_stock') && !$(this).hasClass('out_stock_default')) {
                                $(this).find("span").remove();
                                $(this).removeClass('out_stock');
                            }
                            var cVid = $(this).attr('value_id');
                            if ($.inArray(cVid, vids[vid]) == -1) {
                                if ($(this).find("img").length > 0) {
                                    $(this).append("<span></span>")
                                }
                                $(this).removeClass('active').addClass('out_stock');
                            }
                        });
                    }
                });
            }
        });
    },
    //尺寸显示兼容对照
    sizeToJsonSize: function(size) {
        var sizeJson = {
            'xxl': '2xl',
            '2xl': 'xxl',
            'xxxl': '3xl',
            '3xl': 'xxxl',
            '4xl': 'xxxxl',
            'xxxxl': '4xl',
            '5xl': 'xxxxxl',
            'xxxxxl': '5xl',
            '6xl': 'xxxxxxl',
            'xxxxxxl': '6xl',
            '7xl': 'xxxxxxxl',
            'xxxxxxxl': '7xl'
        };
        if (size) {
            return sizeJson[size];
        }
        return sizeJson;
    },
    //验证属性项是否有选中
    validateSelOptions: function() {
        var optionList = $('.goods_main_attr');
        var length = optionList.length;
        var i = 0;
        optionList.each(function() {
            var len = 0;
            $(this).find('li').each(function() {
                var acClass = 'active';
                if ($(this).hasClass(acClass)) {
                    len = 1;
                    return false;
                }
            });
            if (len == 1) {
                i++;
                $(this).attr('attr_data', 1);
            } else {
                $(this).attr('attr_data', 0);
            }
        });
        //如果是多个属性 并且只选择了一个属性
        $.vidCheckPoa();
        // if (length > 1 && i == 1) {
        //  $.vidCheckPoa();
        // }

        return length == i;
    },
    //获取选中属性项的数据
    getSelectedOptions: function(jump) {
        if(jump==false){
            if (!$.validateSelOptions()) {
                return false;
            }
        }

        var optionList = $('.goods_main_attr');
        var optionIds = new Array;
        var valueIds = new Array;

        optionList.each(function() {
            var option_id = $(this).attr('option_id');
            var value_id = $('li.active', this).attr('value_id');

            // $(this).find('li').each(function() {
            //  var acClass = 'active';
            //  if ($(this).hasClass(acClass)) {
            //      value_id = $(this).attr('value_id');
            //      var tableType = $('#table_type').val();
            //      if (tableType && (option_id == 380 || option_id == 396)) {
            //          var sizeJson = $.sizeToJsonSize();
            //          var sizeText = $(this).attr('value_name'); //$(this).html();
            //          //sizeText = $.trim(sizeText.replace('<i></i>',''));
            //          $('.sizeText').hide().each(function() {
            //              var tmpText = $(this).attr('size').toLowerCase();
            //              var csize = sizeText.toLowerCase();
            //              var sizearrObj = csize.split("-");
            //              if(sizearrObj){
            //                  sizeJson[csize] = sizeJson[sizearrObj[0]]+'-'+sizeJson[sizearrObj[1]];
            //              }
            //              if (tmpText == csize || tmpText == sizeJson[csize]) {

            //                  var sizeType = $.cookie(tableType);
            //                  var conversion = $('#size_' + sizeType + '_' + sizeText).html();
            //                  $(this).find('.conversion').html(conversion);
            //                  $(this).show();
            //              } else {

            //                  if (sizeJson[tmpText] == sizeText.toLowerCase()) {
            //                      $(this).show();
            //                  }
            //              }
            //          });
            //      }
            //      return false;
            //  }
            // });
            optionIds.push(option_id);
            valueIds.push(value_id);
        });
        $.showAttrDesc();
        var result = {};
        result.optionIds = optionIds;
        result.valueIds = valueIds;
        return result;
    },
    vidToVids: function(res) {
        if (!res) {
            return '';
        }
        var html = ' ';
        for (var i in res) {
            html = html + ' v_' + i + '="' + res[i] + '" ';
        }
        return html;
    },
    //库存数据处理回调函数
    stockMessageCallback: function(divID, reFormat) {
        var $status = $('.shipping-time-msg', '.pro-detail-container');
        $status.html($('#' + divID).html());
        if ($('#' + divID).attr("stockTip") == 1) {
            $status.addClass("tips");
        } else {
            $status.removeClass("tips");
        }
        //处理poa不存在情况
        $.vidNoPoa(divID);

        //切换售价
        var finalPrice = $('#' + divID).attr('final_price');
        //是否要重新格式化价格
        if (reFormat == true) {
            var currency = $.setCurrency.getCookieCurrency();
            finalPrice = $('#' + divID).attr('oriFinalPrice');
            finalPrice = $.setCurrency.getPriceByCurrency(finalPrice, currency);
        }
        $('.price_number').attr('oriPrice', $('#' + divID).attr('oriFinalPrice'));
        $('.price_number').html(finalPrice);
        //切换原始价格
        var price = $('#' + divID).attr('price');
        var format_price = $('#' + divID).attr('format_price');
        $('.price_old').attr('oriPrice', $('#' + divID).attr('oriPrice'));
        if (finalPrice != price) {
            //是否要重新格式化价格
            if (reFormat == true) {
                var tmpPrice = $('#' + divID).attr('oriPrice');
                format_price = $.setCurrency.getPriceByCurrency(tmpPrice, currency, true);
            }
            $('.price_old').html(format_price);
            $('.price_other').show();
        } else {
            $('.price_other').hide();
        }

        //切换折扣
        var discount = $('#' + divID).attr('discount');
        if (discount != '' && discount != 'undefined' && discount != null) {
            //先remove掉在追加
            $(".goods_photo_max strong").remove();
            $(".goods_photo_max").append('<strong>' + discount + '</strong>');
            $('.price_off').html(discount + '% OFF');
            $('.icon-sale').html(discount);
        } else {
            $(".goods_photo_max strong").remove();
            $('.price_off').html('');
        }

        //处理积分
        var points = $('#' + divID).attr('points');
        $('#goods_main_note').html(points);

        //是否允许购买
        //var hideBuy = $('#' + divID).attr('hideBuy') == '1' || $('#' + divID).attr('supply_type') == '3';
        var hideBuy = $('#' + divID).attr('hideBuy') == '1';
        if (hideBuy) {
            $('.addcart').addClass('gray');
            $('.addcart').each(function () {
                var btn = $(this).attr('stitle');
                if (btn) {
                    $('b',$(this)).html('<i></i>' + btn);
                }
            })

        } else {
            $('.addcart').removeClass('gray');
            $('.addcart').each(function () {
                var btn = $(this).attr('mtitle');
                $('b',$(this)).html('<i></i>' + btn);
            })

        }
        //处理最大购买 是否是清货产品
        var maximum = $('#' + divID).attr('stocks');
        var limitProduct = $('#' + divID).attr("limitProduct");
        var showStocks = $('#' + divID).attr("showStocks");
        var clearStock = $('#' + divID).attr('clearStock');
        var otherSataus = $('#' + divID).attr('otherSataus');
        clearStock = parseInt(clearStock);
        limitProduct = parseInt(limitProduct);
        var maxbuynum = $("#qty").attr("maxbuylimit");
        $('#maximum').html($('#maximum').attr('str') + ': ' + maximum);
        if (clearStock > 0 || (limitProduct > 0 && showStocks > 0)) {
            $('#maximum').show();
            if ($(".quantity_box #qty").val() > maximum) {
                $(".quantity_box #qty").val(maximum);
                $(".quantity_box #qty").attr("oldqty", maximum);
            } else {
                $(".quantity_box #qty").val(1);
                $(".quantity_box #qty").attr("oldqty", 1);
                $(".quantity_box .next").removeClass("gray");
            }
        }else{
            $('#maximum').hide();
        }

        if (clearStock > 0) {
            if(otherSataus == 1 && $('#' + divID).attr('product_type') != 16 && $('#' + divID).attr('product_type') != 4){
                //清仓产品提示
                $(".goods_title").find("span b").text($(".goods_title").find("span").attr("data-tip"));
                $(".goods_title").find("span").hide();

                $(".clear_tip").html($(".clear_tip").attr("data-save") + ' <b>20%</b> ' + $(".clear_tip").attr("data-off"));
                $(".clear_tip").hide();

                if($('#' + divID).attr('product_type') == 7){//dropship 产品
                    $("#dropshipPro").hide();
                    $(".goods_title").find("span").show();
                    $("#dropshipPro").html($('#dropshipPro').attr('str') + ': ' + maximum);
                }
            }else{
                //清仓产品提示
                $(".goods_title").find("span b").text($(".goods_title").find("span").attr("data-tip"));
                $(".goods_title").find("span").show();

                $(".clear_tip").html($(".clear_tip").attr("data-save") + ' <b>20%</b> ' + $(".clear_tip").attr("data-off"));
                // 清仓20标志不显示
                // $(".clear_tip").show();
            }

        } else {
            $(".quick-buy-box-container .quantity_box #qty").val(1);
            $(".quick-buy-box-container .quantity_box #qty").attr("oldqty", 1);
            $(".quick-buy-box-container .quantity_box .next").removeClass("gray");

            //清仓产品提示
            $(".goods_title").find("span").hide();
            $(".goods_title").find("span b").text("");

            $(".clear_tip").hide();
            $(".clear_tip").text("");
            if($('#' + divID).attr('product_type') == 7){//dropship 产品
                $('#maximum').hide();
                $("#dropshipPro").html($('#dropshipPro').attr('str') + ': ' + maximum);
                $("#dropshipPro").show();
            }

        };

        //多件起购
        var minNum = $('#' + divID).attr('minumum');
        $('#minimum').html($('#minimum').attr('str') + ': ' + minNum);
        if (minNum && minNum > 1) {
            $('#minimum').show();
            if ($(".quick-buy-box-container .quantity_box #qty").val() < minNum) {
                $(".quick-buy-box-container .quantity_box #qty").val(minNum);
                $(".quick-buy-box-container .quantity_box #qty").attr("oldqty", minNum);
                $(".quick-buy-box-container .quantity_box #qty").attr('minumum', minNum);
            }
        } else {
            $('#minimum').hide();
        }

        $('#qty').attr('clearStock', clearStock);
        $('#qty').attr('buylimit', maximum);
        $('#qty').attr('showStocks', showStocks);
        $('#qty').attr('limitProduct', limitProduct);
        $('#qty').attr('maximum', maximum);
        $("#maximum").attr("data-default", maximum);
        //批发用户处理:10件启购
        ajaxisWsPro_fn('ajaxisWsPro');
    },
    vidNoPoa: function(divID) {
        var length = $('.goods_main_attr').length;
        if (length ==1 || length > 2) {
            return;
        }

        $('.goods_main_attr li').each(function() {
            if ($(this).hasClass('out_stock') && !$(this).hasClass('out_stock_default')) {
                $(this).find("span").remove();
                $(this).removeClass('out_stock');
            }
        });
        var vidStr = divID.replace(/stockMsg_CN/ig, "");
        if (vidStr) {
            vidStr = divID.replace(/stockMsg_CN_/ig, "");
            var poaVids = '';
            var vids = vidStr.split('_');
            for (var i in vids) {
                var tmp = $('#' + divID).attr('v_' + vids[i]);
                if (typeof(tmp) == 'undefined' || tmp == '') {
                    continue;
                }
                poaVids = tmp.split('.');
                var node = $("li[value_id^=" + vids[i] + "]").parent();
                node.children().each(function() {
                    var cVid = $(this).attr('value_id');
                    if ($.inArray(cVid, poaVids) == -1) {
                        if ($(this).find("img").length > 0) {
                            $(this).append("<span></span>")
                        }
                        $(this).removeClass('active').addClass('out_stock');
                    }
                });
            }
        }
    },
    chkQuantity: function() {
        var quantity = parseInt($("#qty").val());
        var minQuantity = parseInt($("#qty").attr('minumum'));
        if (!(/(^[0-9]\d*$)/.test(quantity)) || !quantity || quantity == 0) {
            quantity = 1;
        }
        if(minQuantity && minQuantity>=quantity) {
            quantity = minQuantity;
        }
        $("#qty").val(quantity);
    },
    //添加产品到购物车
    addToCart: function(btn) {

        //判断是否是flash deals产品?
        if ($(btn).hasClass("dealsguy")) {
            var limitbuy = $(btn).attr('limitbuy');
            if (limitbuy == 0) {
                var xiangou_tip = $(btn).siblings("#xiangou_tip").text();
                $(btn).addClass('gray');
                ZSAlert(xiangou_tip, 'Tips', 'OK');
            }
        }

        // var hasABtest = /nc_a=1/.test($('.head .bag .title a')[0].href);

        if ($(btn).hasClass('gray')) {
            return false;
        }

        $.chkQuantity();

        var qty = $("#qty").val();

        //获取选中的属性
        var selOpResult = $.getSelectedOptions();
        $(".info_title_nc").attr('flg', 1);
        //是否全选中属性
        if(!$.validateSelOptions()){
            selOpResult = false;
        }
        if (!selOpResult) {
            $.validateIsSel();
            return false;
        }
        if (selOpResult) {
            if ($('#isCheckStock').val() == 1) { //检查是否还在查库存状态
                return false;
            }
            //先要删除attr隐藏信息重新生成
            $('#detailCartForm .pAttr').each(function() {
                $(this).remove();
            });
            for (var i = 0; i < selOpResult.optionIds.length; i++) {
                var op = selOpResult.optionIds[i];
                var val = selOpResult.valueIds[i];
                var html = '<input type="hidden" class="pAttr" name="attrs[' + op + ']" value="' + val + '" />';
                $('#detailCartForm').append(html);
            }
        }
        //英国报关链接
		if($(btn).hasClass('DsbqgBg23') && window.productViewI18n && window.productViewI18n.LC_STOCK_MSG_SOLD_OUT){
			$.alertTip(window.productViewI18n.LC_STOCK_MSG_SOLD_OUT);
			return false;
		}
        var save = function () {
          var params = $('#detailCartForm').serialize();
          params = params + '&nc_ref=' + encodeURIComponent(document.referrer);

          var msg = $(btn).attr('msg');
          msg = msg.replace('%d', qty);
          var mTitle = $(btn).attr('mTitle');
          var mBtn = $(btn).attr('mBtn');
          var mBtn1 = $(btn).attr('mBtn1');

          var products_id = $('#products_id').val();
          var catPath = $('#categoryPath').attr('data-path');
          catPath = $.trim(catPath);
          $.ajax({
            type: 'post',
            url: '/api/shopcart/addProduct/',
            data: params,
            dataType: 'json',
            beforeSend: function () {
              // ZSLoad('', '');
              $.zzjLoading($(btn));
            },
            success: function (res) {
              //ZSConfirm(msg, mTitle, mBtn, mBtn1, function(result){
              //  if(result){window.location.href = httpsHomeUrl+'shopping_cart.html';}
              //});
              if (typeof (res.result.status) != 'undefined' && res.result.status == false) {
                $.alert(res.result.message);
              } else {
                if ($(btn).hasClass('wh_addcart')) {
                  location.href = '/shopping_cart.html';
                  return false;
                }
                // 美澳区域关于追踪Google Ads 过程转化指标
                gtag('event', 'conversion', {'send_to': 'AW-852718674/ixvZCM7z07QBENLozZYD'});
                
                $.ajax({
                  type: 'get',
                  url: '/api/ajax/loadHeadCarts/',
                  success: function (res) {
                      $('.header-bag-ajax-html-js').html(res);
                      // 控制凑单页不用回滚到顶部
                      if(window.location.href.indexOf('cash-reduction.html') == -1 && !$('body').hasClass('quick-buy-add-cart-no-scroll-js')) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 'slow');
                      } else {
                          if ($('.index_head_cont:visible', '.home_index_head').length == 0) {
                              $('.index_head_cont', '.home_index_head').stop(true, true).slideDown(200);
                          }
                      }
                      $(".header-bag-products-container-js").slideDown(200, function(){
                        $(".header-bag-scroll-bar-js").mCustomScrollbar({
                            scrollInertia: 200,
                            theme:'dark',
                            scrollButtons:{
                                enable: false
                            },
                            advanced: {
                              updateOnContentResize: true
                            },
                            mouseWheel: {
                              preventDefault: true
                            }
                        });
                      });

                    /*小购物车调用到倒计时*/
                    $.chirst_goods_timers();
                    $.pre_goods_timers();

                    $('#quick_buy').hide();
                    $(document).trigger('quick-buy-add-to-cart');

                  }
                });

                var p = res.result.fbParm;
                // Yahoo统计代码
                window.dataLayer && window.dataLayer.push({
                    'event': 'yahoo-addcart-trigger',
                    'ProductID': $('#products_id').val()
                })
                // reddit event
                window.dataLayer.push({
                    'event': 'reddit-addcart-trigger'
                })

                //fbq('track', 'AddToCart', p);
                // facebook跟踪代码
                dataLayer.push({
                    'event': 'facebook-event-trigger',
                    'facebook-event-name': 'AddToCart',
                    'facebook-event-params': p
                })
                // taboola
                window.dataLayer.push({
                    'event': 'Taboola-addcart-trigger'
                })
                // pinterest
                dataLayer.push({
                  'event': 'pinterest-event-trigger',
                  'pinterest-event-name': 'addtocart',
                  'pinterest-event-params': res.result.pinCode
                })
              }
            },
            complete: function () {
              // $.ZSmsgBox._hide();
              var tip = $(btn).attr('data-added');
              $.zzjLoading($(btn), false, tip);
            }
          });
        };
        save();
        sendGa({
            beforeSend: function () {
                window.dataLayer && (window.dataLayer.quantity = qty);
            },
            callback: function () {
                ga('ec:setAction', 'add');
                ga('send', 'event', 'UX', 'click', 'add to cart');
            }
        });
        /*if (limitbuy == 1) {
            $.ajax({
                url: '/api/shopcart/canFDAddCart/?qty=' + $('#qty').val() + '&products_id=' + $('#products_id').val(),
                dataType:'json',
                beforeSend: function() {
                    ZSLoad('', '');
                },
                complete: function() {
                    $.ZSmsgBox._hide();
                },
                success: function(res) {
                    if (res.code == 1) {
                        save();
                    } else {
                        $.alert(res.msg);
                    }
                }

            });
        } else {
            save();
        }*/


    },
    //添加心愿单
    addToWish: function(e) {
        var products_id = $('#products_id').val();
        products_id = parseInt(products_id);
        $btn = $('#gh').closest('.addwish');
        if (products_id <= 0 || $btn.hasClass('wished')) {return false;}
        $btn.loading();
        // $("i").addClass("active");
        // $btn.addClass('wished');
        // var num = parseInt($("#gh").attr("data-num")) + 1;
        // var Adds = $("#gh").attr("data");
        // var wish = '<u> ' + Adds + '</u>';
        // $('.count', '.addwish').text(num);
        // if (parseInt($("#gh").attr("data-num")) == 0) {
        //  $("#wishAmount").after(wish);
        // }
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: homeUrl + 'api/account/addWishlist/',
            data: {
                'products_id': products_id
            },
            success: function(result) {
                if (result.status) {
                    // $("i").addClass("active");
                    // $btn.addClass('wished');
                    // var num = parseInt($("#gh").attr("data-num")) + 1;
                    // var Adds = $("#gh").attr("data");
                    // var wish = '<u> ' + Adds + '</u>';
                    // $('.count', '.addwish').text(num);
                    // if (parseInt($("#gh").attr("data-num")) == 0) {
                    //  $("#wishAmount").after(wish);
                    // }
                    $btn.addClass('wished');
                    var num = parseInt($("#gh").attr("data-num")) + 1;
                    $('.count', '.addwish').text(num);
                    // 新版头部wish
                    $.setHeadWish(1);
                    // ZSConfirm(result.message, result.label, result.view, result.close, function(r) {
                    //  if (r) {
                    //      window.location.href = homeUrl + 'index.php?com=account&t=my_wishs';
                    //  }
                    // });
                    /*$.alert({
                        title: result.label,
                        content: result.message,
                        okValue: result.view,
                        ok:function () {
                            window.location.href = homeUrl + 'index.php?com=account&t=my_wishs';
                        },
                        cancelValue:result.close,
                        cancel: true
                    });*/
                    // $.msg(result.message, 'success', 2);

                    $.alertTip(result.message);
                    //fbq('track', 'AddToWishlist', result.PinterestParams);
                    dataLayer.push({
                        'event': 'facebook-event-trigger',
                        'facebook-event-name': 'AddToWishlist',
                        'facebook-event-params': result.fbParm
                     })
                    // pinterest lead 事件
                    dataLayer.push({
                      'event': 'pinterest-event-trigger',
                      'pinterest-event-name': 'lead',
                      'pinterest-event-params': result.pinCode
                    })
                } else if (result.noLogin) {
                    // ZSAlert(result.message, result.label, result.btn, '', function(res) {
                    //  if (res && result.url) {
                    //      window.location.href = result.url;
                    //  }
                    // });
                    /*$.alert({
                        title: result.label,
                        content: result.message,
                        okValue: result.btn,
                        ok:function () {
                            window.location.href = result.url;
                        }
                    });*/
                    $.signUser.getSignHtml();
                } else {
                    /*$.alert({
                        title: result.label,
                        content: result.message,
                        ok: false,
                        autoClose: 2
                    });*/
                    $btn.addClass('wished');
                    $.alertTip(result.message);
                }
            },
            complete: function () {
                $btn.loading(false);
            }
        });
    },
    //转换国际码
    selConversion: function(o) {
		window.showPordSizeInfo.selConversion(o);
		$.getSelectedOptions();
		$(".goods_main_list .size_list_box .list").hide();

		var type = o.find('a').attr('size');
		$('#sizeText,.size_list_box .cy_title a').attr('size', type).html(o.find('a').html());

		return;
        var type = o.find('a').attr('size');
        var sizes = new Array();

        $('.size_' + type).each(function() {
            sizes[$(this).attr('size')] = $(this).attr('data');
        });

        $('.size_list_box').each(function () {
            $('.cy_title a').attr('size', type).html(o.find('a').html());
            $('li.active', this).removeClass('active');
            $('li [size="' + type + '"]', this).closest('li').addClass('active');
        });
        o.parent().find(".active").removeClass('active');
        o.addClass('active');


        $('#sizeText').attr('size', type);
        $('#sizeText').html(o.find('a').html());

        $('.goods_main_attr .size li').each(function() {
            var sizeText = $(this).attr('value_name');
            if (typeof(sizes[sizeText]) != "undefined") {
                var sel = '';
                if ($(this).hasClass('active')) {
                    sel = '<i></i>';
                }
                $(this).html(sizes[sizeText] + sel);
            }
        });

        var tableType = $('#table_type').val();
        if (tableType) {
            var date = new Date();
            date.setTime(date.getTime() + (24 * 3600 * 1000));
            $.cookie(tableType, type, {
                path: '/',
                expires: date
            });
        }

        $.getSelectedOptions();
        $(".goods_main_list .size_list_box .list").hide();

        $.addInches(o);

    },
    addInches: function (o) {
		window.showPordSizeInfo.addInches(o);
		return;
        var type = o.find('a').attr('size');
        var objInches = {
            type: type,
            sizes: [o.find('a').text()]
        };
        var arrCup = [],
            arrSize = [];
        $('.size_' + type + '[data-classid="380"]').each(function() {
            arrSize.push($(this).attr('data').split(' ').slice(-1).toString());
        });
        $('.size_' + type + '[data-classid="404"]').each(function() {
            arrCup.push($(this).attr('data').split(' ').slice(-1).toString());
        });
        if (arrCup.length) {
            arrSize.forEach(function (size) {
                arrCup.forEach(function (cup) {
                    objInches.sizes.push(size + ' ' + cup);
                });
            });
        } else {
            objInches.sizes = objInches.sizes.concat(arrSize);
        }

        $('.table-inches').each(function () {
            if ($('th.local-inches', this).length) {
                $('tr', this).each(function (i) {
                    $(this).children().eq(1).text(objInches.sizes[i] || '-');
                });
            } else {
                $('tr', this).each(function (i) {
                    $(this).children().eq(0).after(i === 0 ? '<th class="local-inches">' + objInches.sizes[i] + '</th>' : '<td>' + (objInches.sizes[i] || '-') + '</td>');
                });
            }
        });
    },
});

$.showTooltip = function () {
	window.showPordSizeInfo.setSizeTip();
	return false;
    var sizeJson = $.sizeToJsonSize();

    var tableType = $('#table_type').val();
    var $size,
        $cupSize,
        sizeText = '',
        csize = null,
        sizearrObj = null;

    var attrSize = ''; // 多个size

    var sizeType = tableType ? $.cookie(tableType) : false;

    var arrayCvs = [];

    var replaceCvs = function (arr) {
        var metra,
            replaceData;
        if ($.type(arr) === 'array' && arr.length === 2) {
            metra = arr[0];
            replaceData = arr[1].split(',');
            return metra.replace('%cup%', replaceData[0]).replace('%oricup%', replaceData[1]);
        } else {
            return arr;
        }
    };

    $('.goods_main_attr[option_id="380"] li, .goods_main_attr[option_id="396"] li').each(function () {
        var sizeText = $(this).attr('value_name');
        var csize = sizeText.toLowerCase();
        var sizearrObj = csize.split('-');
        var arrayCvs = [];
        attrSize = csize;
        if(sizearrObj[1]){
            sizeJson[csize] = sizeJson[sizearrObj[0]]+'-'+sizeJson[sizearrObj[1]];
        }
        sizeType && arrayCvs.push( $('#size_' + sizeType + '_' + sizeText).html());

        if ($('.goods_main_attr[option_id="404"]').length && ($cupSize = $('.goods_main_attr[option_id="404"] li.active')).length) {
            attrSize += $cupSize.attr('value_name');
            sizeType && arrayCvs.push( $('#size_' + sizeType + '_' + $cupSize.attr('value_name')).html());
        }
        var $sizeText = null;
        $('.sizeText').hide().each(function() {
            var tmpText = $(this).attr('size').toLowerCase();
            if (tableType && (tmpText == attrSize.toLowerCase() || tmpText == sizeJson[csize])) {
                $(this).find('.conversion').html(replaceCvs(arrayCvs));
                $sizeText = $(this);
            } else {
                if (sizeJson[tmpText] == sizeText.toLowerCase()) {
                    $sizeText = $(this);
                }
            }
        });
        if ($sizeText) {
            if ($(this).data('toggle')) {
                $(this).attr('title', $sizeText.html());
            } else {
                $(this).attr({
                    'data-placement': 'bottom-right',
                    'data-title': $sizeText.html(),
                    'data-toggle': 'tooltip',
                    'data-skin': 'pro-size-tooltip',
                    // 'data-align-to': '.goods_main_attr'
                });
            }
        }
    });
};

$(document).on('click', '.ZSdialog-backdrop', function(){
    $('.ZSdialog .nc-icon-close.btn-close').trigger('click');
})
.on('click', '.size-charts-wrap .nav-tabs li span', function () {
    var $li = $(this).closest('li'),
		index = $li.index(),
		$pane = $('.tab-content-js').children(':visible').eq(index),
		outer_elm = $('.detail-slider-box-js', '.zs-dialog-body')[0],
		inner_elm = $('.tab-content-js', '.zs-dialog-body')[0],
		slider_elm = $('.size-charts-wrap .mCSB_dragger', '.zs-dialog-body')[0];
	$li.addClass('active').siblings().removeClass('active');
	var top_dis = $(".zs-dialog-body .tab-content-js>.tab-pane:eq(" + index + ")").position().top;
	if (inner_elm.offsetHeight > outer_elm.offsetHeight && top_dis > inner_elm.offsetHeight - outer_elm.offsetHeight) {
		top_dis = inner_elm.offsetHeight - outer_elm.offsetHeight;
		top_dis = Math.ceil(top_dis);
	}
	$(".zs-dialog-body .mCSB_container").css({ 'top': -(top_dis) });
	var sliderCurrent = (outer_elm.offsetHeight - slider_elm.offsetHeight) * top_dis / (inner_elm.offsetHeight - outer_elm.offsetHeight);
	slider_elm.style.top = sliderCurrent + "px";
}).on('click', '.size-charts-wrap :radio[name="radio-chart-size"]', function () {
    var $this = $(this),
        $tab = $($this.data('tab'));

    $tab.show().siblings().hide();
    setTimeout(function () {
        $this.uniform().closest('li').siblings().uniform();
    }, 100)
}).on('mouseenter', '.size-charts-wrap .tab-chart-size-wrap td', function () {
    var $tr = $(this).closest('tr');
    $(this).addClass('active');
    $('td:first', $tr).addClass('active');
}).on('mouseleave', '.size-charts-wrap .tab-chart-size-wrap td', function () {
    var $tr = $(this).closest('tr');
    $('td', $tr).removeClass('active');
}).on('click', '.size-charts-wrap .size_list_box .list li', function () {
    var size = $('a', this).attr('size');
    $(this).addClass('active').siblings().removeClass('active');
    $('.goods_main_list .size_list_box .list li a[size="' + size + '"]').trigger('click');
    $('a', $(this).closest('.cy_title')).attr('size', size).html($(this).text());
    $('.list', $(this).closest('.size_list_box')).hide();
}).on('mouseenter', '.size-charts-wrap .size_list_box', function () {
    $('.list', this).stop().slideDown();
}).on('mouseleave', '.size-charts-wrap .size_list_box', function () {
    $('.list', this).stop().slideUp();
}).on('mouseenter', '.app-discount-wrap', function () {
    var $d = $('.dialog-app', this);
    this.timer && clearTimeout(this.timer);
    $d.show();
}).on('mouseleave', '.app-discount-wrap', function () {
    var $d = $('.dialog-app', this);
    this.timer = setTimeout(function () {
        $d.hide();
    }, 200);

}).on('click', '.show_conversion_size', function (e) {
	if ($.cookie("is_show_conversionSize") == 1) { return; }
	if ($(this).children("input").val() >= 5) {
		return;
	}
	$(this).children("input").val(Number($(this).children("input").val()) + 1);
	if ($(this).children("input").val() == 5) {
		$.cookie("is_show_conversionSize", "1", { expires: 365, path: '/' });
        $('.conversion_size').show();
        $('.zs-dialog-body .detail-slider-box-js').mCustomScrollbar('update');
		if ($('.zs-dialog-content .nav-tabs-chart li:visible').length > 1) {
			$('.zs-dialog-content .tab-pane_title').show();
		};
		$('.zs-dialog-content .nav-tabs-chart li').css({ 'width': (1 / $('.zs-dialog-content .nav-tabs-chart li:visible').length) * 100 + '%' });
	}
});

function set_product_detail_ga(name){
    // alert(name);
    ga('send', 'event', 'Product Detail Atatistics', name, name, 1);
}

/*20180511*/
$(document).on("mouseenter","#quick_buy .pro-img-container .img-list>li",function(){
    ga('send', 'event', 'ALL', 'hover', 'top_myChangeCurrency_text_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020806'});}
});
$(document).on("mouseenter","#quick_buy .pro-img-container .img-big-container>.img img",function(){
    ga('send', 'event', 'ALL', 'hover', 'top_listImg_image_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020807'});}
})
$(document).on("mousedown","#quick_buy .pro-img-container .img-list-container .prev",function(){
    ga('send', 'event', 'ALL', 'click', 'top_listPrev_button_180508');
})
$(document).on("mousedown","#quick_buy .pro-img-container .img-list-container .next",function(){
    ga('send', 'event', 'ALL', 'click', 'down_listNext_button_180508');
})
$(document).on("mousedown","#quick_buy .pro-buy-container .goods_main_tabs .discount-wrap .read-more",function(){
    var ga_str = $(this).attr("ga-read-more").toLowerCase();
    if(ga_str=="fd"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreFD_link_180508');
    }else if(ga_str=="vip1"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreVip1_link_180508');
    }else if(ga_str=="vip2"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreVip2_link_180508');
    }else if(ga_str=="ds"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreDs_link_180508');
    }else if(ga_str=="super_clearance"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreSuperClearance_link_180508');
    }else if(ga_str=="special"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreSpecial_link_180508');
    }else if(ga_str=="sale_promotion"){
        ga('send', 'event', 'ALL', 'click', 'middle_listReadMoreSalePromotion_link_180508');
    }

})
$(document).on("mousedown","#quick_buy .pro-buy-container .goods_main_attr .color>li",function(){
    ga('send', 'event', 'ALL', 'click', 'middle_listColorClearfix1_image_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020811'});}
})
$(document).on("mouseenter","#quick_buy .pro-buy-container .goods_main_attr .color>li",function(){
    ga('send', 'event', 'ALL', 'hover', 'middle_listColorClearfix2_image_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020812'});}
})
$(document).on("mouseenter","#quick_buy .pro-buy-container .goods_main_list .cy_list",function(){
    ga('send', 'event', 'ALL', 'hover', 'middle_listCyTitleActive_datalist_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020813'});}
})
$(document).on("mousedown","#quick_buy .pro-buy-container .goods_main_attr .size>li",function(){
    ga('send', 'event', 'ALL', 'click', 'middle_listSizeClearfix1_button_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020814'});}
})
$(document).on("mouseenter","#quick_buy .pro-buy-container .goods_main_attr .size>li",function(){
    ga('send', 'event', 'ALL', 'hover', 'middle_listSizeClearfix3_button_180508');
    if(typeof(JGData) != 'undefined'){JGData.sendRec({'point_id':'18129020815'});}
})
$(document).on("mousedown","#quick_buy .pro-buy-container .size_chart",function(){
    ga('send', 'event', 'ALL', 'click', 'middle_listSizeChartSizeChartAnchor_button_180508');
})
$(document).on("mousedown","#quick_buy .pro-buy-container .quantity_box>div>span",function(){
    ga('send', 'event', 'ALL', 'click', 'down_listQuantityBox_button_180508');
})
$(document).on("focus","#quick_buy .pro-buy-container .quantity_box>div>input",function(){
    ga('send', 'event', 'ALL', 'onFocus', 'down_listQuantityBox_text_180508');
})
$(document).on("mousedown","#quick_buy .pro-buy-container .goods_main_buy .addcart",function(){
    ga('send', 'event', 'ALL', 'click', 'down_listAddcart_button_180508');
})
$(document).on("mousedown","#quick_buy .pro-buy-container .goods_main_buy .addwish",function(){
    ga('send', 'event', 'ALL', 'click', 'down_listAddwish_button_180508');
})
$(document).on("mousedown",'#quick_buy .pro-buy-container a[data-point-id="18129020827"]',function(){
    ga('send', 'event', 'ALL', 'click', 'down_listViewFullDeals_text_180508');
})
$(document).on("mousedown","#quick_buy .pro-detail-container>i.nc-icon-close",function(){
    ga('send', 'event', 'ALL', 'click', 'top_listClose_button_180508');
})
$(document).on('mousedown','#quick_buy .preorder-product-ga-js',function(){
	ga('send', 'event', 'all', 'click', 'middle_listReadMorePreorder_link_190506');
})

// 尺码优化 2018-4-12  尺码信息，描述，通过ajax获取返回
;(function () {

	var showPordSizeInfo = {
		getSizeData: function () {
			return window.sizeData;
		},
		setSizeTip: function () {
			var data = this.getSizeData();
			var data = this.getSizeData();
			if (!data.ncStateSizeTips) {return;}
			$('.goods_main_attr[option_id="380"] li, .goods_main_attr[option_id="396"] li').each(function () {
				var $this = $(this),
					id = [$this.attr('value_id')],
					$cupSize,
					textObj = null;
				if ($('.goods_main_attr[option_id="404"]').length && ($cupSize = $('.goods_main_attr[option_id="404"] li.active')).length) {
					id = [id + '_' + $cupSize.attr('value_id'), $cupSize.attr('value_id') + '_' + id];
				}
				for(var i = 0; i< id.length ;i++) {
					if (!textObj) {
						textObj = ((data.ncStateSizeTips || {})[$.cookie('_conversionType')] || {})[id[i]];
					} else {
						break;
					}
				}
				if (textObj) {
					var html = '<i></i><span class="notice_title"><span class="conversion">' + textObj.text1 + '</span>' + textObj.text2 + '</span>'
					if ($(this).data('toggle')) {
						$(this).attr('data-title', html).data('title', html);
					} else {
						$(this).attr({
							'data-placement': 'bottom-right',
							'data-title': html,
							'data-toggle': 'tooltip',
							'data-skin': 'pro-size-tooltip',
							// 'data-align-to': '.goods_main_attr'
						});
					}
				}
			});

		},
		selConversion: function ($obj) {


			var data = this.getSizeData();
			if (!data.ncStateSize) {return;}

			var	type = $obj.find('a').attr('size') || $.cookie('_conversionType') || data.ncStateCode;
			var sizeObj = data.ncStateSize[type];

			var date = new Date();
			date.setTime(new Date().getTime() + (24 * 3600 * 1000));
			$.cookie('_conversionType', type, {
				path: '/',
				expires: date
			});

			for(var key in sizeObj) {
				$('.goods_main_attr li[value_id="' + key + '"]').html(type + ' ' + sizeObj[key]);
			}
			this.addInches($obj);
		},
		addInches: function ($obj) {

			var data = this.getSizeData();
			if (!data.ncProductSizeTable) {return;}
			var type = $obj.find('a').attr('size') || $.cookie('_conversionType') || data.ncStateCode,
				objInches = {
					type: type,
					sizes: [$obj.find('a').text()]
				};
			objInches.sizes = objInches.sizes.concat(data.ncProductSizeTable[type]);
			$('.table-inches').each(function () {
				if ($('th.local-inches', this).length) {
					$('tr', this).each(function (i) {
						$(this).children().eq(1).text(objInches.sizes[i] || '-');
					});
				} else {
					$('tr', this).each(function (i) {
						$(this).children().eq(0).after(i === 0 ? '<th class="local-inches">' + objInches.sizes[i] + '</th>' : '<td>' + (objInches.sizes[i] || '-') + '</td>');
					});
				}
			});
		}

	};
	window.showPordSizeInfo = showPordSizeInfo;
})();

