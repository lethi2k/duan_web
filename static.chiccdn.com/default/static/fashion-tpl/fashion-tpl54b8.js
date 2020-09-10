/**
 * Created by Administrator on 2018/1/15.
 */
function changeActiveStyle(obj, img, color) {
    //当前元素已获得焦点的就不用改变了
    $('[style]','.activity_fix').removeAttr('style');
    if ($(obj).hasClass('current') || $(obj).hasClass('active')) {
        return false;
    }
    if (img && img != '0') {
        $(obj).css({'background': img + ' repeat'});
    } else {
        $(obj).css({'background': ''});
    }
    if (color && color != '0') {
        $(obj).css('color', color).find('*').css('color', color);
    } else {
        $(obj).css('color', '').find('*').css('color', '');
    }
}
$(function () {
    $('.act_top').click(function (e) {
        $('body,html').animate({scrollTop:0});
        e.stopPropagation();
    })
    $('.lst_nav','.activity_fix').onePageNav({
        scrollSpeed:300
    });
    $('.title', '.activit_index').each(function () {
        var wids = ($(this).outerWidth() - $('.text', this).outerWidth()) / 2;
        $('.doc', this).css('width', wids + 'px');
    })
    $('.handle','.activity_fix').click(function () {
        var me=$(this);
        me.toggleClass('close');
        if(me.hasClass('close')){
            me.closest('.activity_fix').addClass('close');
            if(me.data('usehotzone')){
                setTimeout(function(){
                    me.show();
                },300)
            }
        }else{
            me.closest('.activity_fix').removeClass('close');
            if(me.data('usehotzone')){
                me.hide();
            }
        }
    })
    $('.js-hot-zone','.activity_fix').click(function(){
        $('.handle','.activity_fix').trigger('click');
    })
    /* $("img.lazy").lazyload({
     effect: "fadeIn"
     });*/
    if($.regParams(location.href).index){
        $('.act_full_nav li').eq($.regParams(location.href).index).addClass('active').siblings('li').removeClass('active');
    }
    //均分
    $('.event-kind').each(function () {
        var lent=$('li',this).length;
        $('li',this).css('width',(100/lent)+'%')
    })
    $('.event-kind li').click(function () {
        var $me=$(this);
        var $parent=$(this).closest('.activity_tpl');
        var index=$(this).index();
        $me.addClass('active').siblings('li').removeClass('active');
        $('.kind_index .tpl_lst', $parent).eq(index).show().siblings().hide();
        $('.kind_index .tpl_lst', $parent).hide();
        $('.kind_index .tpl_lst', $parent).eq(index).show();
        if ($(this).parents('ul').hasClass('clock_kind')) {
            //更改活动tab的样式
            var focus_image = $(this).attr('data-focus_image')
                ? 'url(' + $(this).attr('data-focus_image') + ')' + ' repeat' : '#e30057';
            var focus_font_color = $(this).attr('data-focus_font_color')
                ? $(this).attr('data-focus_font_color') : '#fff';
            $me.css({'background': focus_image, 'color': focus_font_color})
                .siblings('li').each(function () {
                var blur_image = $(this).attr('data-blur_image')
                    ? 'url(' + $(this).attr('data-blur_image') + ')' + ' repeat' : '#333333';
                var blur_font_color = $(this).attr('data-blur_font_color')
                    ? $(this).attr('data-blur_font_color') : '#e30057';

                $(this).css({
                    'background': blur_image,
                    'color': blur_font_color
                });
                $(this).find('*').css({'color': blur_font_color});
            });
            $me.find('*').css({'color': focus_font_color});
        }
    })
    function digitize(n) {//数字转数组
        var str = n + "";
        var arr = [];
        str.split("").forEach(function (item) {
            arr.push(parseInt(item));
        })
        return arr;
    }
    var fashion_trimer= setInterval(function () {
        $('[data-timer]').each(function () {
            var $me=$(this);
            var time=parseInt($me.attr('data-timer'));
            time--;
            var time_josn=timeCountDown(time);

            var day=parseInt(time_josn.day) < 10 ?  '0'+time_josn.day : time_josn.day
            var hour=time_josn.hour;
            var minute=time_josn.minute;
            var second=time_josn.second;
            if($(this).hasClass('head_clock')){
                var day_arr=digitize(day);
                var hour_arr=digitize(hour);
                var minute_arr=digitize(minute);
                var second_arr=digitize(second);
                $('.d',$me).eq(0).text(day_arr[0]);
                $('.d',$me).eq(1).text(day_arr[1]);
                $('.m',$me).eq(0).text(hour_arr[0]);
                $('.m',$me).eq(1).text(hour_arr[1]);
                $('.m',$me).eq(0).text(minute_arr[0]);
                $('.m',$me).eq(1).text(minute_arr[1]);
                $('.s',$me).eq(0).text(second_arr[0]);
                $('.s',$me).eq(1).text(second_arr[1]);
            }else{
                $('.d',$me).text(day);
                $('.h',$me).text(hour);
                $('.m',$me).text(minute);
                $('.s',$me).text(second);
            }

            $me.attr('data-timer',time)
            if(time <= 0){
                $me.removeAttr('data-timer');
            }
        })
    }, 1000);
})

/*20180626 分享链接*/
window.fbAsyncInit = function() {
    FB.init({
            appId: '1543133879317815',
            xfbml: true,
            version: 'v2.5',
            status: true,
            cookie: true
    });
};
(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/* 点击执行分享，登记用户分享的数据 */
function shareFacebook() {
	var image = $('meta[property="og:img"]').attr("content");
	var title = $('meta[property="og:title"]').attr("content");
	var url = $('meta[property="og:url"]').attr("content");
	var desctiption = $('meta[property="og:description"]').attr("content");
	var params = {
			method: 'feed',
			display: 'popup',
			link: url,
			picture: image,
			name: title,
            caption: 'newchic',
            desctiption: "  ",
	};
    FB.ui(params, function(response) {
        if (response != undefined) {
            $.ajax({
                type: 'POST',
                url: homeUrl + 'api/lottery/saveShareLog/',
                dataType: 'JSON',
                data: {'type' : 1},//目前只有fb
                success: function(res) {
                }
            });

        }else{

        }
    });
}

function pin(e){
    var pin_token = $.cookie('pintrest_token');
    var image = $('meta[property="og:img"]').attr("content");
    var title = $('meta[property="og:title"]').attr("content");
	if(!pin_token){
        // window.location.href="/index.php?com=pinit&t=login";
        window.open("/index.php?com=pinit&t=login");
	}else{
		$.ajax({
			url:'/api/pinit/pinitPcFashionCollection/',
			type : 'get',
			dataType:'html',
			data :"pin_image="+image+"&pin_name="+title,
			success:function(html){
				ZSHtml(html,'Pin It','','');
			},
		});
	}
}
function addBoard(){
	var board_name = $('#board_name').val();
	var tip_name = $('#board_name').attr('tip');
	if(board_name==tip_name){return false;}
	$.ajax({
		url:homeUrl+'api/pinit/createBoard/',
		type : 'post',
		dataType:'json',
		data :'board_name='+board_name,
		success:function(res){
			if(res.status==1){
				$("#board_list").html(res.board_list);
			}else{
				$('#opt_tip').html(res.msg);
			}
		}
	});
}

$(document).on("click","#pintrest",function(){
	var id = $("#fashion_id").val();
	var bid = $("input[name='xz']:checked").val();
    var image = $('meta[property="og:img"]').attr("content");
    var title = $('meta[property="og:title"]').attr("content");
	if(!bid || !title || !image){return false;}
	$.ajax({
		url:homeUrl+'api/pinit/createPcFashionCollectionPin/',
		type : 'post',
		dataType:'json',
		data :'id='+id+'&pin_image='+image+'&pin_name='+title +"&board=" + bid,
		success:function(res){
			ZSHtml(res.html,'Pin It','','');
		}
	});
})
.on("click","#create_board",function(){
	addBoard();
})
.on("click","#pin_content,#edit_content",function(){
	$('#pin_content').attr("readonly",false)
})
.on("focus","#board_name",function(){
	var board_name = $('#board_name').val();
	var tip_name = $('#board_name').attr('tip');
	if(board_name==tip_name){$('#board_name').val('');}
});

function shareTwitter(elm) {
	var title = $('meta[property="og:title"]').attr("content");
	var text = title + '---' + window.location.href;
	var href = '//twitter.com/intent/tweet?text=' + text;
	// window.location.href = href;
	window.open(href);
}

/*ga埋点 */
$(document).on('mousedown', '.ga-fb-share', function () {//点击模版页导航的facebook分享图标
    ga('send', 'event', 'all', 'click', 'right_facebookShare_image_180706');
}).on('mousedown', '.ga-pin-share', function () {//点击模版页导航的pinterest分享图标
    ga('send', 'event', 'all', 'click', 'right_pinterestShare_image_180706');
}).on('mousedown', '.ga-tw-share', function () {//点击模版页导航的twitter分享图标
    ga('send', 'event', 'all', 'click', 'right_twitterShare_image_180706');
}).on('click', '[data-ga-event]', function() {
    var gaEventData = $(this).attr('data-ga-event').split('|');
    ga('send', 'event', gaEventData[0], gaEventData[1], gaEventData[2]);
});