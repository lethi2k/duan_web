(function (window,$) {
    var thum_pics =function (option) {
        this.opt={
            $turnBOx:null,
            $turnUl:null,
            $turnNext:null,
            $turnPrev:null,
            $turnTab:null,
            turnWit:null,
            index:0,
        };
        this.opt=$.extend(this.opt,option);
        this.init();
        /**/
    }
    thum_pics.prototype.init=function () {
        var me=this;
        if(me.opt.$turnUl.find('li').length > 1){
            me.appendDocs(me.opt);
        }
        me.initUl(me.opt);
        me.opt.$turnNext.bind({
            'click':function (e) {
                me.nextShow(me.opt);
                e.stopPropagation();
            },
            'mouseleave':function (e) {
                e.stopPropagation();
            }
        })
        me.opt.$turnPrev.bind({
            'click':function (e) {
                me.pretShow(me.opt);
                e.stopPropagation();
            },
            'mouseleave':function (e) {
                e.stopPropagation();
            }
        })
        me.changeSrc(me.opt);
    }
    thum_pics.prototype.appendDocs=function (obj) {
        var me=obj;
        for (var b = 0; b < me.$turnUl.find('li').length; b++) {
            me.$turnTab.append('<li><i></i></li>');
        }
        me.$turnTab.find('li:first').addClass('active');
    }
    thum_pics.prototype.initUl=function (obj) {
        var me=obj;
        me.$turnUl.css({'position':'absolute','width':me.turnWit*me.$turnUl.find('li').length+'px',});
    }
    thum_pics.prototype.nextShow=function (obj) {
        var me=obj;
        me.index++;
        me.index= me.index > me.$turnUl.find('li').length -1 ? me.$turnUl.find('li').length -1 : me.index;
        var big_img=me.$turnUl.closest('.alert_wom_lst ').find('.wom_lst_pic img');

        var imgPath =me.$turnUl.children('li').eq(me.index).find('img').attr('data-big-img');
        var img = new Image();
        img.src = imgPath;
        if(img.complete||img.width) {
            big_img.attr('src', imgPath);
        }else{
            //me.$turnUl.closest('.alert_wom_lst').find('.wom_lst_pic').append("<img class='pic_load_gif' src='/templates/default/images/loading_3.gif'/>")
            big_img.attr('src','/templates/default/images/loading-logo.gif');
            $(img).load(function () {
                big_img.attr('src', imgPath);
                //me.$turnUl.closest('.alert_wom_lst').find('.pic_load_gif').remove();
            })
        }

        if(me.index >= 0){
            me.$turnUl.children('li').eq(me.index).addClass('active').siblings('li').removeClass('active');
        }
        me.$turnPrev.removeClass('disabled');

        me.$turnUl.animate({left:(-me.index*me.turnWit)+'px'});
        me.$turnTab.find('li').eq(me.index).addClass('active').siblings('li').removeClass('active');
         //console.log(me.$turnUl.find('li').eq(me.index).nextAll('li').length)
        if(me.index+1 > me.$turnUl.find('li').length -1){
            //me.$turnNext.hide();
            me.$turnNext.addClass('disabled');
            me.index=me.$turnUl.find('li').length -1;
            return false;
        }
    }
    thum_pics.prototype.pretShow=function (obj) {
        var me=obj;
        me.index--;
        me.index=me.index < 0 ? 0 : me.index;

        var big_img=me.$turnUl.closest('.alert_wom_lst ').find('.wom_lst_pic img');

        var imgPath =me.$turnUl.children('li').eq(me.index).find('img').attr('data-big-img');
        var img = new Image();
        img.src = imgPath;
        if(img.complete||img.width) {
            big_img.attr('src', imgPath);
        }else{
            //me.$turnUl.closest('.alert_wom_lst').find('.wom_lst_pic').append("<img class='pic_load_gif' src='/templates/default/images/loading_3.gif'/>")
            big_img.attr('src','/templates/default/images/loading-logo.gif');
            $(img).load(function () {
                big_img.attr('src', imgPath);
                //me.$turnUl.closest('.alert_wom_lst').find('.pic_load_gif').remove();
            })
        }

        if(me.index >=0){
            me.$turnUl.children('li').eq(me.index).addClass('active').siblings('li').removeClass('active');
        }
        me.$turnNext.removeClass('disabled');

        me.$turnUl.animate({left:(-me.index*me.turnWit)+'px'});
        me.$turnTab.find('li').eq(me.index).addClass('active').siblings('li').removeClass('active');
        if(me.index-1 < 0){
            me.$turnPrev.addClass('disabled');
            me.index=0;
            return false;
        }
    }
    thum_pics.prototype.changeSrc=function (obj) {
        var me=obj;
        me.$turnUl.children('li').mouseenter(function () {
            var _this=$(this);
            wom_timer=setTimeout(function () {
                me.index= _this.index();
                if(me.index > 0 && me.index < me.$turnUl.find('li').length -1){
                    _this.closest('.alert_wom_lst ').find('.chang').removeClass('disabled');
                }else if(me.index == 0 ){
                    _this.closest('.alert_wom_lst ').find('.prev').addClass('disabled');
                }else if(me.index == me.$turnUl.find('li').length -1){
                    _this.closest('.alert_wom_lst ').find('.next').addClass('disabled');
                }
                var big_img=me.$turnUl.closest('.alert_wom_lst ').find('.wom_lst_pic img');

                var imgPath =me.$turnUl.children('li').eq(me.index).find('img').attr('data-big-img');
                var img = new Image();
                img.src = imgPath;
                if(img.complete||img.width) {
                    big_img.attr('src', imgPath);
                }else{
                    //me.$turnUl.closest('.alert_wom_lst').find('.wom_lst_pic').append("<img class='pic_load_gif' src='/templates/default/images/loading_3.gif'/>")
                    big_img.attr('src','/templates/default/images/loading-logo.gif');
                    $(img).load(function () {
                        big_img.attr('src', imgPath);
                        //me.$turnUl.closest('.alert_wom_lst').find('.pic_load_gif').remove();
                    })
                }

                _this.addClass('active').siblings('li').removeClass('active');
            },200);
        }).mouseleave(function () {
            clearTimeout(wom_timer);
        })
    }
    window.Thum_Pics=function (opt) {
        return new thum_pics(opt);
    }
})(window,jQuery);
$(function () {

    $(document).on('mouseenter', '.use_wom_lst .wom_lst_pic', function () {
        var wom_parent=$(this).closest('.wom_lst_detail');
        $('.alert_wom_lst').hide();
        wom_parent.find('.alert_wom_lst').show();
        if($('.wom_pic_all > ul li',wom_parent).length <= 5){
            $('.chang',wom_parent).hide();
            $('.wom_pic_all',wom_parent).css('margin',0)
        }
        if(!wom_parent.hasClass('active') && wom_parent.find('.alert_wom_lst').length){
            $('.wom_pic_li img',wom_parent).each(function () {
                $(this).attr('src',$(this).attr('data-original'));
            })
            Thum_Pics({
                $turnBOx:$('.wom_pic_detail',wom_parent),
                $turnUl:$('.wom_pic_detail .wom_pic_all > ul',wom_parent),
                $turnNext:$('.wom_pic_detail .next',wom_parent),
                $turnPrev:$('.wom_pic_detail .prev',wom_parent),
                $turnTab:$('#change_pro_pics .carouse_tab'),
                turnWit:$('.wom_pic_detail .wom_pic_all > ul > li',wom_parent).outerWidth(true),
            })
            wom_parent.addClass('active');
        }

    });
    $(document).on('mouseleave', '.alert_wom_lst', function (e) {
        $(this).hide();
    })
    var wom_pos=($(window).width()-1200)/2+1200;
    $(document).on('mouseenter', '.wom_Lclothes_nav .wom_Lclothes_navlst', function () {
        if($('.wom_Lclothes_alter',$(this)).length == 0) return false;
        $('.wom_Lclothes_alter',$(this)).show();
        var wom_wid=0;
        $('.wom_Lclothes_alter .wom_Lclothes_rit',$(this)).each(function () {
            wom_wid+=$(this).outerWidth(true);
        })
        $('.wom_Lclothes_alter .wom_Lclothes_btm',$(this)).css('width',wom_wid+'px');
        var sef_post=$('.wom_Lclothes_alter',$(this)).offset();
        if(sef_post.left+$('.wom_Lclothes_alter',$(this)).outerWidth() > wom_pos){
            $('.wom_Lclothes_alter',$(this)).css({'left':'auto','right':0})
        }
    })
    .on('mouseleave', '.wom_Lclothes_nav .wom_Lclothes_navlst', function () {
        $('.wom_Lclothes_alter',$(this)).hide();
    })

    $(document).on('click', '.like a', function(){
        if($(this).hasClass('nc-icon-heart')) return false;
        var url = homeUrl +'api/account/addWishlist/';
        var products_id = $(this).attr('data-productsid');
        var _this = $(this);
        products_id = parseInt(products_id);
        if(products_id<=0) return false;
        _this.loading();
        $.ajax({
            type:'POST',
            dataType:'JSON',
            url:url,
            data:{'products_id':products_id},
            success:function(result){
                // $('.like_a').children("i").addClass("active");
                if(result.status){
                    _this.addClass('nc-icon-heart').removeClass('nc-icon-heart-linear');
                    /*ZSConfirm(result.message, result.label, result.view, result.close, function(r){
                        if(r){window.location.href = homeUrl+'index.php?com=account&t=my_wishs';}
                    });*/
                    $.alertTip(result.message);
                    $('i',_this).text(result.wishCount)
                    /*头尾部改版
                    * */
                    // $('.index_wish .wish_nums','.home_index_head').text(result.wishlistNum)
                    $('.header-wishlist-num-js').text(result.wishlistNum);
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
                }else if(result.noLogin){
                   /* ZSAlert(result.message,result.label,result.btn,'',function(res){
                        if(res && result.url){window.location.href = result.url;}
                    });*/
                    $.signUser.getSignHtml();
                }else{
                    // ZSAlert(result.message,result.label,result.btn,'');
                    $.alertTip(result.message);
                }
            },
            complete: function () {
                _this.parent().loading(false);
            }
        });
    });
    $(document).on('click', '.like a', function(){
        //8、加入收藏夹 ：add to wishlists
        var gasource = $('#gasource').attr("data-gasource");
        ga('send', 'event', gasource, 'Add To Wishlists', 'Add To Wishlists', 1);
    });
})

$(function () {

    $.loadImg=function (opt) {
        var thumb_img = new Image();
        thumb_img.src = opt.src;
        if (thumb_img.complete || thumb_img.width) {
            opt.afterFn && opt.afterFn(opt.src);
        } else {
            opt.beforeFn && opt.beforeFn();
            $(thumb_img).load(function () {
                opt.afterFn && opt.afterFn(opt.src);
            })
        }
    }
    $(document).on('mouseenter', '.wom_lst_all', function(){
        $(this).closest('.wom_lst_detail').addClass('active');
        if(!$('.thump-lst li',this).length){
            $(this).closest('.wom_lst_detail').addClass('nothing_thump');
        }
        $('.thump-lst img:not(.reals)',this).lazyload();
    }).on('mouseleave', '.wom_lst_all', function(){
        $(this).closest('.wom_lst_detail').removeClass('nothing_thump active');
    });
    //#size-list,
    $(".nav_filters_cat, .assisted_filters").on("mouseover", ".nav_filters_selected", function(event){
        if ($('ul', $(this)).length) {
            var filters_ul = $('ul', $(this)).show().css('top', $('.nav_filters_item', this).position().top + $('.nav_filters_item', this).outerHeight() - 1);
            $('.nav_filters_item', $(this)).addClass('active');
        }
    }).on("mouseout", ".nav_filters_selected", function(){
        if ($('ul', $(this)).length) {
            $('ul', $(this)).hide().removeAttr('style');
            $('.nav_filters_item', $(this)).removeClass('active')
        }
    });
    $(document).on('mouseenter', '.wom_lst_all', function(){
        $(this).closest('.wom_lst_detail').addClass('active');
        if(!$('.thump-lst li',this).length){
            $(this).closest('.wom_lst_detail').addClass('nothing_thump');
        }
        $('.thump-lst img:not(.reals)',this).lazyload();
    }).on('mouseleave', '.wom_lst_all', function(){
        $(this).closest('.wom_lst_detail').removeClass('nothing_thump active');
    }).on('mouseenter', '.wom_lst_all .thump-lst a', function(){
        var $this = $(this);
        this.timer = setTimeout(function () {
            $.loadImg({
                src: $('img',$this).attr('data-big-img'),
                beforeFn: function () {
                    $this.loading(true);
                },
                afterFn: function (src) {
                    $('.active',$this.closest('.thump-lst')).removeClass('active');
                    $this.loading(false).addClass('active');
                    $('.wom_lst_pic img.reals',$this.closest('.wom_lst_all')).attr('src',$('img',$this).attr('data-big-img'));
                    $($this.closest('.wom_lst_all').find('.wom_lst_pic .item_list_logo_icon_image')).hide();
                    //对比图片，找出主图，主图显示logo icon
                    var currentImgInfo = $('img',$this).attr('data-big-img').slice($('img',$this).attr('data-big-img').indexOf('newchic'))
                    var dataOriginInfo = $this.closest('.wom_lst_all').find('.wom_lst_pic img.reals').data('original').slice($this.closest('.wom_lst_all').find('.wom_lst_pic img.reals').data('original').indexOf('newchic'))
                    if(currentImgInfo == dataOriginInfo){
                        var currencyArr = ['PHP','MXN','TWD','IDR','COP','ARS','VND'];
                        var wom_currency = $.cookie('currency');
                        var isLogoIcon = true;
                        $.each(currencyArr, function (index, value) {
                            if(value==wom_currency) {
                                isLogoIcon = false;
                                return isLogoIcon;
                            } else {
                                isLogoIcon = true;
                            }
                        });
                        if(isLogoIcon) {
                            $.each($('.item_list_logo_icon_image_first'), function (index, value) {
                                $($this.closest('.wom_lst_all').find('.item_list_logo_icon_image_first')).show();
                            });
                            $.each($('.item_list_logo_icon_image_second'), function (index, value) {
                                $($this.closest('.wom_lst_all').find('.item_list_logo_icon_image_second')).hide();
                            });
                        } else {
                            $.each($('.item_list_logo_icon_image_first'), function (index, value) {
                                $($this.closest('.wom_lst_all').find('.item_list_logo_icon_image_first')).hide();
                            });
                            $.each($('.item_list_logo_icon_image_second'), function (index, value) {
                                $($this.closest('.wom_lst_all').find('.item_list_logo_icon_image_second')).show();
                            });
                        }
                    }
                }
            })
        }, 100)
    }).on('mouseleave', '.wom_lst_all .thump-lst a', function(){
        this.timer && clearTimeout(this.timer);
        $('.goods-photoes .show-pic').loading(false);
        $(this).loading(false);
    });
    /*下拉选择*/
    $(".category_content .tools_box").HoverDelay({
        hoverEvent: function (obj) {
            return function () {
                $(obj).children(".box").slideDown(200);
            }
        },
        outEvent: function (obj) {
            return function () {
                $(obj).children(".box").slideUp(200);
            }
        }
    });
 /*   $('a', '.wom_lst_all .thump-lst').mouseenter(function () {
        var $this = $(this);
        this.timer = setTimeout(function () {
            $.loadImg({
                src: $('img',$this).attr('data-big-img'),
                beforeFn: function () {
                    $this.loading(true);
                },
                afterFn: function (src) {
                    $('.active',$this.closest('.thump-lst')).removeClass('active');
                    $this.loading(false).addClass('active');
                    $('.wom_lst_pic img',$this.closest('.wom_lst_all')).attr('src',$('img',$this).attr('data-big-img'));
                }
            })
        }, 100)
    }).mouseleave(function () {
        this.timer && clearTimeout(this.timer);
        $('.goods-photoes .show-pic').loading(false);
        $(this).loading(false);
    });*/

    $('.filters_price').mouseenter(function () {
        $(this).css({
            'width':$(this).outerWidth(),
            'z-index':56
        }).addClass('active');
    }).mouseleave(function () {
        $(this).removeClass('active').removeAttr('style');
    })
    if($('p img', $('.brand-img-slide').closest('dd')).length){
        var brandWid=0;
        var brandNum=null;
        $('.brand-img-lsts dd a').each(function () {
            brandWid+=$(this).outerWidth(true);
            if(brandWid >= $('.brand-img-lsts dd').width()){
                brandNum=$(this).index()-1;
                return false;
            }
        })
        if(brandNum === null){
            $('.brand-img-slide').hide();
        }else{
            $('.brand-img-slide').show().click(function () {
                if($('.brand-img-lsts dd a').eq(brandNum+1).is(':hidden')){
                    $('i',this).attr('class','nc-icon nc-icon-up');
                    $('em',this).text($(this).attr('data-fewer'));
                    $('.brand-img-lsts dd a:gt('+brandNum+')').show();
                }else{
                    $('i',this).attr('class','nc-icon nc-icon-down');
                    $('em',this).text($(this).attr('data-more'));
                    $('.brand-img-lsts dd a:gt('+brandNum+')').hide();
                }
            })
        }
    }

    //轮播
    (function () {
        var slide = {
            NCslide: function (opt) {
                var scrollPic = function (option) {
                    this.opt = {
                        parentDome:null,//附近容器
                        dome: null,//异步分页的容器
                        next:null,
                        prev:null,
                        curr:0,
                        limit: 5,
                        lent: 0, //总条数
                        data:[],
                        wid:1230,
                        status:true,
                        finish:true
                    };
                    this.opt = $.extend(this.opt, option);
                    this.init();
                }
                scrollPic.prototype.init = function () {
                    var me = this;
                    me.opt.lent=me.opt.dome.children('*').length;
                    me.opt.pageSize = Math.ceil(me.opt.lent / me.opt.limit);
                    me.opt.dome.children('*').each(function () {
                        me.opt.data.push(this);
                    })
                    me.opt.wid = $('li',me.opt.dome).outerWidth() * me.opt.limit
                    this.bindEven()
                    me.opt.prev.hide();
                    if(me.opt.pageSize <=1){
                        me.opt.next.hide();
                        $('img', me.opt.dome).lazyload();
                    }else{
                        me.opt.next.trigger('click');
                    }
                }
                scrollPic.prototype.bindEven = function () {
                    var me=this,
                        opt=this.opt;
                    opt.next.unbind('click').click(function () {
                        opt.curr=opt.curr+1;
                        if (opt.curr >= opt.pageSize) {
                            opt.curr = opt.pageSize;
                            $(this).hide();
                        }
                        if (opt.curr > 1) {
                            me.opt.prev.show();
                        }
                        me.endtime(1);
                        $('img', me.opt.dome).lazyload();
                    })
                    opt.prev.unbind('click').click(function () {
                        opt.curr=opt.curr-1;
                        if (opt.curr <= 1) {
                            opt.curr = 1;
                            $(this).hide();
                        }
                        me.opt.next.show();
                        me.endtime();
                    })
                }
                scrollPic.prototype.dataSlide = function () {
                    var me=this;
                    return me.opt.data.concat().splice(me.opt.curr * me.opt.limit -  me.opt.limit,  me.opt.limit);
                }
                scrollPic.prototype.endtime = function ($event) {
                    var me=this,
                        opt=this.opt;
                    if(opt.curr > opt.pageSize){
                        opt.finish=false;
                    }
                    if (opt.curr <= opt.pageSize && opt.curr >= 1) {
                        opt.dome.css({width:$('li',opt.dome).length*$('li',opt.dome).outerWidth(),left:-(opt.wid*(opt.curr-1))});
                    }
                    opt.status=false;
                }
                return new scrollPic(opt);
            }
        }
        $.extend($, slide);
    })();
    setQuickBuy();
    $('#relate-goods').each(function () {
        var self = $(this)
        if($(this).length){
            $.NCslide({
                parentDome:$(this),//附近容器
                dome:$('#relate-ul',this),//异步分页的容器
                next:$('.recommand__products-next',this),
                prev:$('.recommand__products-prev',this),
                curr:0,
                limit: $(window).width() > 1500 ? 6 : 5,
                wid: self.find('.recommand__products--slide-cont').width(),
                lent: 0 //总条数
            })
            $(this).removeClass('recommand__products--hidden')
        }

    })
    function setQuickBuy() {
        $(document).on('click', '.recommand__products-js .buy-now-js',function() {
            var $this = $(this),
                rmmds = $this.data('quick-rmmds'),
                id = $this.attr('data-id');
                if (rmmds) {
                    Rd.sendRec({
                        products_id: id,
                        ac: 'view',
                        r_position: rmmds.split('rmmds=')[1]
                    });
                }

                $.quickBuy.getMoal($this, id, function(elem) {
                    if (rmmds) {
                        $(document).find('.addcart').attr('data-quick-rmmds', rmmds.split('=')[1]).attr('data-pid', id)
                    }
                });

        })
        $(document).on('click', '.resize-quick-buy-container .addcart',function() {
            var $this = $(this),
                rmmds = $this.data('quick-rmmds'),
                pid = $this.data('pid');
            if (rmmds && pid) {
                Rd.sendRec({
                    products_id: pid,
                    ac: 'cart',
                    r_position: rmmds
                });
            }
        })
    }

    function setRecommendPicSizeType (dom) {
        if (!getRecommendPicSizeType(dom)) {
            dom.addClass('recommand__products__list--square')
            dom.parent().addClass('recommand__products—cnt--square')
        }

    }
    // 获取推荐位图片正/长方形，正：0，长：1
    function getRecommendPicSizeType(dom) {
        var type = 0;
        dom.children('*').each(function () {
            if ($(this).data('size') == 1) {
                type = 1;
            }
        })
        return type;
    }
})

//20180526类目页埋点
$(document).on('mousedown', '.inhere_filters_nc>ul>li a', function () {//鼠标点击取消选择的按钮
    //排除clear all  a:not([title="Clear all"])
    ga('send', 'event', 'category', 'click', 'top_cancelSelect_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060912' }); }
}).on('mousedown', '.nav_filters_cat .filters_first dd a', function () {//鼠标点击分类中的文字
    ga('send', 'event', 'category', 'click', 'top_categories_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060913' }); }
}).on('mousedown', '.nav_filters_cat .brand-img-lsts dd a', function () {//鼠标点击品牌的图片
    ga('send', 'event', 'category', 'click', 'top_brand_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060914' }); }
}).on('mousedown', '.nav_filters_cat .brand-img-lsts .brand-img-slide', function () {//鼠标点击更多品牌按钮
    ga('send', 'event', 'category', 'click', 'right_moreBrand_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060915' }); }
}).on('mousedown', '.assisted_filters .filters_price .enter_num input', function () {//鼠标点击价格填写的文本框
    ga('send', 'event', 'category', 'click', 'left_price_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060917' }); }
}).on('mousedown', '.assisted_filters .filters_free>a', function () {//鼠标点击免邮筛选框
    ga('send', 'event', 'category', 'click', 'middle_freeShipping_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060918' }); }
}).on('mousedown', '.assisted_filters .filters_ship>a', function () {//鼠标点击24小时发货筛选框
    ga('send', 'event', 'category', 'click', 'middle_shipIn24Hour_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060919' }); }
}).on('mousedown', '.assisted_filters .filters_activity>a', function () {//鼠标点击活动筛选框
    ga('send', 'event', 'category', 'click', 'middle_activity_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060920' }); }
}).on('mousedown', '.assisted_filters .filters_page .filters_page_next', function () {//鼠标点击下一页按钮
    ga('send', 'event', 'category', 'click', 'right_nextPage_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060921' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_pic a', function () {//鼠标点击商品大图
    ga('send', 'event', 'category', 'click', 'down_bigImage_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060922' }); }
}).on('mouseenter', '.preOrder .wom_lst_detail .wom_lst_all .thump-lst ul li a', function () {//鼠标悬浮预览进行大图查看
    ga('send', 'event', 'category', 'hover', 'down_smallImage_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060923' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_btm .like a', function () {//鼠标点击收藏按钮
    ga('send', 'event', 'category', 'click', 'left_collection_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060924' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_btm .brand', function () {//鼠标点击品牌按钮
    ga('send', 'event', 'category', 'click', 'down_brandGoods_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060925' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_btm i.nc-icon-activity-freeshippin', function () {//点击包邮图标
    ga('send', 'event', 'category', 'click', 'left_ship_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060926' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_btm i.nc-icon-activity-special', function () {//点击折扣图标
    ga('send', 'event', 'category', 'click', 'left_discount_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060927' }); }
}).on('mousedown', '.preOrder .wom_lst_detail .wom_lst_all .wom_lst_btm .any', function () {//点击折扣文字
    ga('send', 'event', 'category', 'click', 'left_discount_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060928' }); }
}).on('mousedown', '.page_num .ga_prev_page', function () {//点击上一页商品
    ga('send', 'event', 'category', 'click', 'middle_previousGoods_button180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060929' }); }
}).on('mousedown', '.page_num .ga_next_page', function () {//点击下一页商品
    ga('send', 'event', 'category', 'click', 'middle_nextGoodsl_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060930' }); }
}).on('mousedown', '.page_num a:not(.ga_prev_page,.ga_next_page)', function () {//点击页码
    ga('send', 'event', 'category', 'click', 'middle_pageNumber_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060931' }); }
}).on('mousedown', '.cate__recommend .recommand__products-prev', function () {//推荐区-鼠标点击上一张喜欢的商品的按钮
    ga('send', 'event', 'category', 'click', 'left_previousLike_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060932' }); }
}).on('mousedown', '.cate__recommend .recommand__products-next', function () {//推荐区-鼠标点击下一张喜欢的商品的图片
    ga('send', 'event', 'category', 'click', 'right_nextLike_button_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060933' }); }
}).on('mousedown', '.relat-lst-swipe .search_lst_all .search_lst_cont ul li .pic_tab img', function () {//推荐区-鼠标点击推荐的喜欢的商品的图片
    ga('send', 'event', 'category', 'click', 'left_like_image_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060934' }); }
}).on('mousedown', '.lst-relate .relate-main>a', function () {//推荐区-鼠标点击相关搜索词
    ga('send', 'event', 'category', 'click', 'down_relatedSearches_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060935' }); }
}).on('mouseenter', '.assisted_filters .nav_filters_selected', function () {//鼠标悬浮筛选列表
    ga('send', 'event', 'category', 'hover', 'top_sort_datalist_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060938' }); }
}).on('mousedown', '.assisted_filters .nav_filters_selected>ul>li:eq(0) a', function () {//鼠标点击mostPopular文字
    ga('send', 'event', 'category', 'click', 'top_mostPopular_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060939' }); }
}).on('mousedown', '.assisted_filters .nav_filters_selected>ul>li:eq(1) a', function () {//鼠标点击newArriva文字
    ga('send', 'event', 'category', 'click', 'top_newArrival_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060940' }); }
}).on('mousedown', '.assisted_filters .nav_filters_selected>ul>li:eq(2) a', function () {//鼠标点击priceHighToLow文字
    ga('send', 'event', 'category', 'click', 'top_priceHighToLow_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060941' }); }
}).on('mousedown', '.assisted_filters .nav_filters_selected>ul>li:eq(3) a', function () {//鼠标点击priceHighToHigh文字
    ga('send', 'event', 'category', 'click', 'top_priceHighToHigh_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060942' }); }
}).on('mousedown', '.assisted_filters .nav_filters_selected>ul>li:eq(4) a', function () {//鼠标点击recommend文字
    ga('send', 'event', 'category', 'click', 'top_recommend_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060943' });  }
}).on('mouseenter', '.cate-filter--top .ui-select', function () {//鼠标悬浮筛选列表
    ga('send', 'event', 'category', 'hover', 'top_sort_datalist_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060938' }); }
}).on('mousedown', '.cate-filter--top .ui-select__list>li:eq(0) a', function () {//鼠标点击mostPopular文字
    ga('send', 'event', 'category', 'click', 'top_mostPopular_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060939' }); }
}).on('mousedown', '.cate-filter--top .ui-select__list>li:eq(1) a', function () {//鼠标点击newArriva文字
    ga('send', 'event', 'category', 'click', 'top_newArrival_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060940' }); }
}).on('mousedown', '.cate-filter--top .ui-select__list>li:eq(2) a', function () {//鼠标点击priceHighToLow文字
    ga('send', 'event', 'category', 'click', 'top_priceHighToLow_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060941' }); }
}).on('mousedown', '.cate-filter--top .ui-select__list>li:eq(3) a', function () {//鼠标点击priceHighToHigh文字
    ga('send', 'event', 'category', 'click', 'top_priceHighToHigh_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060942' }); }
}).on('mousedown', '.cate-filter--top .ui-select__list>li:eq(4) a', function () {//鼠标点击recommend文字
    ga('send', 'event', 'category', 'click', 'top_recommend_text_180508');
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060943' }); }
}).on('mousedown', '#cateFirstRec dd a', function() {
    var _this = $(this);
    var cateName = _this.data('catename'),
        key = _this.data('key'),
        title = _this.data('title');
    set_ga_opera(cateName, key, title, 1 )
}).on('mousedown', '#cateSecondRec dd a', function() {
    var _this = $(this);
    var cateName = _this.data('catename'),
        key = _this.data('key'),
        title = _this.data('title');
    set_ga_opera(cateName, key, title, 4 )
})

function top_filters_ga(filter_name) {
    ga('send', 'event', 'category', 'click', 'top_' + filter_name + '_text_180508', 1);
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060916' }); }
}
function filter_ga_click(categories_name, filter_name, filter_value) {
    ga('send', 'event', 'category', 'click', 'top_' + categories_name + '_' + filter_name + '_' + filter_value + '_text_180508', 1);
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060937' }); }
}
function filter_ga_hover(categories_name, filter_name, filter_value) {
    ga('send', 'event', 'category', 'hover', 'top_' + categories_name + '_' + filter_name + '_' + filter_value + '_datalist_180508', 1);
    if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060936' }); }
}
function set_ga_opera(categories_name,filter_name,filter_value, key) {
    if (key) {
      filter_name = parseFloat(filter_name) + key
    }
    ga("send", "event", "category", "click", "top_" + categories_name + "_" + filter_name + "_" + filter_value + "_181217", 1);
    // if (typeof (JGData) != 'undefined') { JGData.sendRec({ 'point_id': '18129060937' }); }
    return false;
  }
 $(function(){
    var currencyArr = ['PHP','MXN','TWD','IDR','COP','ARS','VND'];
    var wom_currency = $.cookie('currency');
    var isLogoIcon = true;
    $.each(currencyArr, function (index, value) {
        if(value==wom_currency) {
            isLogoIcon = false;
            return isLogoIcon;
        } else {
            isLogoIcon = true;
        }
    });
    if(isLogoIcon) {
        $.each($('.item_list_logo_icon_image_first'), function (index, value) {
            $(this).show();
        });
        $.each($('.item_list_logo_icon_image_second'), function (index, value) {
            $(this).hide();
        });
    } else {
        $.each($('.item_list_logo_icon_image_first'), function (index, value) {
            $(this).hide();
        });
        $.each($('.item_list_logo_icon_image_second'), function (index, value) {
            $(this).show();
        });
    }

    var $propagandaSize = $('.propaganda-font-js');
    for(var i=0;i<$propagandaSize.length;i++) {
        if($propagandaSize.eq(i).height()>0 && $propagandaSize.eq(i).height()<=16) {
            $('.propaganda-font-js').eq(i).css({
                'fontSize':'18px'
            })
        }
    }
    var $logoIconPriceSize = $('.item_list_logo_icon_image_first .icon-price-js');
    for(var i=0;i<$logoIconPriceSize.length;i++) {
        if($logoIconPriceSize.eq(i).width()>97) {
            $logoIconPriceSize.eq(i).css('fontSize','14px')
        } else {
            $logoIconPriceSize.eq(i).css('fontSize','16px')
        }
    }
})
