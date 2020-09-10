/**
 * Created by Administrator on 2017/5/4.
 */
$(function () {
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });
    var banner_counts = $('.intell_banner ul li').length;
    var banner_show_index = 0;
    var widt;
    var $banner = $('.intell_banner');
    var loopPlay = banner_counts > 1;
    if ($banner.length) {
        $banner.find('.bannerTop li:first img').get(0).onload = function () {
            console.log('height: ' + $banner.find('.bannerTop').height());
            $banner.find('.box').css('height', $banner.find('.bannerTop').height());
            $banner.find('.bannerTop').find('li').css('width', $(window).width());
        }
        for (var b = 0; b < banner_counts; b++) {
            $('.intell_banner .point-list').append('<span class="point"></span>');
        }
        $('.intell_banner .point-list span:first').addClass('active');
        if (loopPlay) {
            $('.intell_banner .bannerTop').append($('.intell_banner .bannerTop').find('li:first').clone(true));
        }
        function banner_show(obj) {
            if (obj != undefined) {
                if (obj.hasClass('point')) {
                    banner_show_index = obj.index();
                } else if (obj.hasClass('prev')) {
                    banner_show_index--;
                } else if (obj.hasClass('next')) {
                    banner_show_index++;
                }
            } else {
                banner_show_index++;
            }
            if (loopPlay) {
                if (banner_show_index > banner_counts - 1) {
                    $('.intell_banner ul').animate({ left: (-banner_show_index * wid) + 'px' },function(){
                        $('.intell_banner ul').css({ left: '0px' });
                        banner_show_index = 0;
                        $('.intell_banner .point-list span').eq(banner_show_index).addClass('active').siblings('span').removeClass('active');
                    });
                } else if (banner_show_index < 0) {
                    $('.intell_banner ul').css({ left: (-banner_counts * wid) + 'px' });
                    banner_show_index = banner_counts - 1;
                    $('.intell_banner ul').animate({ left: (-banner_show_index * wid) + 'px' });
                    $('.intell_banner .point-list span').eq(banner_show_index).addClass('active').siblings('span').removeClass('active');
                } else {
                    $('.intell_banner ul').animate({ left: (-banner_show_index * wid) + 'px' });
                    $('.intell_banner .point-list span').eq(banner_show_index).addClass('active').siblings('span').removeClass('active');
                }
            } else {
                if (banner_show_index > banner_counts - 1) {
                    banner_show_index = 0;
                } else if (banner_show_index < 0) {
                    banner_show_index = banner_counts - 1;
                }
                $('.intell_banner ul').animate({ left: (-banner_show_index * wid) + 'px' });
                $('.intell_banner .point-list span').eq(banner_show_index).addClass('active').siblings('span').removeClass('active');
            }
        }
        var banner_timer = setInterval(banner_show, 4000);
        $('.intell_banner').hover(function () {
            clearTimeout(banner_timer);
        }, function () {
            banner_timer = setInterval(banner_show, 4000);
        })
        $('.intell_banner .point-list span').mouseover(function () {
            banner_show($(this));
        })
        $('.intell_banner .change').click(function (event) {
            banner_show($(this));
            event.stopPropagation();
        })
        $('.new_sns_l ul').each(function () {
            if ($(this).find('li').length > 6) {
                $(this).find('li:last').css('border', 'none');
            }
        })
        var hash_index = '';
        $('.intell_top a').click(function () {
            $(this).closest('li').addClass("active");
            $(this).closest('li').siblings('li').removeClass('active');
            hash_index = $(this).closest('li').index();
            $('.intell_btm', $(this).closest('.intell_lst')).eq(hash_index).stop(true, true).fadeIn().siblings('.intell_btm').stop(true, true).fadeOut();
            if (!$(this).hasClass('finish_click')) {
                $('.intell_btm', $(this).closest('.intell_lst')).eq(hash_index).find('img').lazyload({
                    effect: "fadeIn"
                });
                $(this).addClass('finish_click');
            }
        })

        if ($.regParams(location.href).index) {
            $('.intell_top li').eq($.regParams(location.href).index).addClass('active').siblings('li').removeClass('active');
        }
        $('.intell_top li.active').each(function () {
            $('.intell_btm', $(this).closest('.intell_lst')).eq($(this).index()).find('img').lazyload({
                effect: "fadeIn"
            });
            $(this).find('a').addClass('finish_click').trigger('click');
        })
        $(window).resize(function () {
            var $banner = $('.intell_banner');
            wid = $(window).width();
            $banner.find('.bannerTop').find('li').css('width', wid);
            if (loopPlay) {
                $banner.find('.bannerTop').css('width', (banner_counts + 1) * wid);
            } else {
                $banner.find('.bannerTop').css('width', banner_counts * wid);
            }
            $banner.find('.box').css('height', $banner.find('.bannerTop').height());
            banner_show_index = 0;
            $banner.find('.bannerTop').css('left', '0');
        }).trigger('resize');
    }

    /*var lent=$('.intell_top li').length;
    if(lent > 4){
       $('.intell_top').addClass('intell_amx');
        $('.intell_top li').css('width',(100/lent)+'%');
    }*/

    var inviteLink = new Url(window.location.href);
    if ((($('.aff-code-js').length > 0 && $('.aff-code-js').val() != '')) || ((inviteLink.query.p || inviteLink.query.pm) && inviteLink.query.time && inviteLink.query.type)) {
        var ajaxData = { s_lang: inviteLink.query.s_lang || $('.aff-url-lang-js').val() || 'en-GB' };
        if ($('.aff-code-js').length > 0 && $('.aff-code-js').val() != '') {
            $.extend(ajaxData, { aff_code: $('.aff-code-js').val() })
        } else {
            var pCode = window.location.href.match(/\?.+/) ? window.location.href.match(/\?.+/)[0].slice(1) : '';
            if (inviteLink.query.pm) {
                $.extend(ajaxData, { pm: pCode });
            } else if (inviteLink.query.p) {
                $.extend(ajaxData, { p: pCode });
            }
        }
        $.ajax({
            url: '/api/account/setAffScode/',
            type: 'POST',
            data: ajaxData,
            dataType: 'JSON',
            success: function (res) {
                if (res.result.qrCode) {
                    $('.lst-item-qrcode-js').attr('src', res.result.qrCode);
                }
            },
        })
    }
});

function rulesDetail() {
    $(".rulesBg").fadeIn();
}
function closeRules() {
    $(".rulesBg").fadeOut();
}
$(window).trigger("scroll")