/**
 * Created by Administrator on 2017/8/17.
 */
function img_lazyload(){
    $("img.bg_lazy").lazyload({
        placeholder : "http://img.banggood.com/newimages/grey.gif",
        effect      : "fadeIn"
    });
}
img_lazyload();

(function () {
    var $banner = $('.banner-container'),
        bgUrl = $banner.data('background'),
        img = new Image(),
        callback = function (height) {
            $banner.css({
                backgroundImage: 'url(' + bgUrl + ')',
                height: height
            });
        };
    if (!$banner.length) {return;}
    img.src = bgUrl;

    if (img.complete) {
        callback(img.height);
    } else {
        img.onload = function () {
            callback(this.height);
        };
    }

})();

/*
$('.like_a').click(function(){
    var url = 'http://'+window.location.host + '/api/account/addWishlist/';
    var products_id = $(this).attr('data-productsid');
    var _this = $(this);
    products_id = parseInt(products_id);
    if(products_id<=0) return false;
    $.ajax({
        type:'POST',
        dataType:'JSON',
        url:url,
        data:{'products_id':products_id},
        success:function(result){
            //$('.like_a').children("i").addClass("active");
            if(result.status){
                _this.children("i").addClass("active");
                ZSConfirm(result.message, result.label, result.view, result.close, function(r){
                    if(r){window.location.href = homeUrl+'index.php?com=account&t=my_wishs';}
                });
            }else if(result.noLogin){
                ZSAlert(result.message,result.label,result.btn,'',function(res){
                    if(res && result.url){window.location.href = result.url;}
                });
            }else{
                ZSAlert(result.message,result.label,result.btn,'');
            }
        }
    });
});

*/


$(function(){
    $('.nav').onePageNav();
     var $nav = $('.nav-container'),
         wrapContainer=$('.wrap-container',$nav);
    wrapContainer.closest('.nav-container').css({
        height:wrapContainer.outerHeight()+'px'
    })
    $(document).scroll(function() {
        var scrollTop = $(document).scrollTop(),
            offsetTop = $nav.offset().top,
            headHeight = $('.index_head_cont', '.head_new ').outerHeight() + $('body').offset().top;
        if(offsetTop < scrollTop + headHeight){
            wrapContainer.css({
                position:'fixed',
                top:headHeight+'px',
                width:'100%',
                zIndex:'8',
                background:'#FFF',
                paddingTop:'18px'
            })
        } else {
            wrapContainer.removeAttr('style');
        }
    }).trigger('scroll');
    $('.header-top-set-outer-js').show();
    $('.nav-container .nav-tabs a').click(function() {
        return false;
    });
    /*coupon*/
    $('.top_coupon .top_pics_close').bind('click',function () {
        $('.top_coupon').css('top','auto').addClass('top_pic_btm');
        $('.top_coupon ul li').slideUp();
        $(this).hide();
        $('.top_coupon .toppic_open').show();
    })
    $('.top_coupon .toppic_open').bind('click',function () {
        $('.top_coupon').removeClass('top_pic_btm');
        $('.top_coupon ul li').slideDown('normal',function () {
            var height = $('.top_coupon').outerHeight(),
                winHeight = $(window).height(),
                marginTop = (winHeight - height) / 2;
            if (marginTop < 0) {
                marginTop = 0;
            }
            $('.top_coupon').css('top', marginTop);
        });
        $(this).hide();
        $('.top_coupon .top_pics_close').show();
    })
    var coupon_str='<div class="coupon_none">'+
        '<img src="/templates/default/images/top_pic_rel_07.png" alt="">'+
        '</div>';
    $('.top_coupon .get_coupon').click(function (event) {
        var sef = $(this);
        $.ajax({
            url: '/api/collection/getCustomersCoupon/?hf_id='+sef.parents('ul').attr('data-id')+'&coupon_id='+sef.parents('li').attr('data-id'),
            type: 'get',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                if (data.status === 0) {
                    ZSAlert(data.msg,'','Sign In','',function () {
                        location.href = '/login.html?backUrl='+location.href+'&isback=1';
                    });
                } else if(data.status === 1){
                    ZSAlert(data.msg,'','OK');
                    if(!sef.parents('li').find('coupon_none').length){
                        sef.parents('li').addClass('has-received').append(coupon_str);
                    }
                }else{
                    ZSAlert(data.msg,'','OK');
                }
            }
        });
        event.preventDefault();
    });
    // 通过高度判断是是否为一行
    if(parseInt($(".nav-contain-new ul").prop('clientHeight'))>54) {
        $(".nav-contain-new ul").removeClass("isOneLine");
    } else {
        $(".nav-contain-new ul").addClass("isOneLine");
    }

    $(document).on('click', '[data-ga-event]', function() {
        var gaEventData = $(this).attr('data-ga-event').split('|');
        ga('send', 'event', gaEventData[0], gaEventData[1], gaEventData[2]);
    });
});
