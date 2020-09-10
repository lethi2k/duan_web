$(function () {
    var $search_form=$('.search_form_db');
    var $search_result_list=$('.search-result-list-js',$search_form);
    var keyword_Input;
    var rand_keyword=false;

	var sLang = $.cookie('_bgLang');
	var sKey = 'sc_'+sLang;
	if ($.cookie(sKey) === undefined) {
		$.ajax({
			type: "GET",
			url: "/api/search/webKeyword/",
			//data:{com:'search',t:'webKeyword'},
			dataType: "json",
			success: function(data){
				if(data.length){
					var lent=data.length-1;
					if(data.length >= 0 && location.href.indexOf('/search/') < 0){
						var one_num=Math.ceil(Math.random()*lent);
						rand_keyword=data[one_num].keyword;
						$("#keywords").val(rand_keyword).addClass('colors_gray');
						if(data[one_num].url != 'javascript:void(0);'){
							$("#keywords").attr('url',data[one_num].url);
						}
						var work_url = rand_keyword+'||'+data[one_num].url;
						$.cookie(sKey, work_url, { expires: 0.25, path: '/' });
					}
				}

			}
		});
	}else{
		if(location.href.indexOf('/search/') < 0){
			var sc_words = $.cookie(sKey);
			var words = sc_words.split('||');
			rand_keyword = words[0];
			$("#keywords").val(words[0]).addClass('colors_gray');
			if(words[1] != 'javascript:void(0);'){
				$("#keywords").attr('url',words[1]);
			}
		}
	}

    var $search_form_obj={
        $lst_hide:function (jq) {
            jq.hide();
        },
        getSearchKeywords:function (val) {
            var cat_id = 0;
            // 新需求不要分类，传0或者不传都可以
            // if($('input[name="currentPageName"]').val() == 'categoryList'){
            //     cat_id = $('input[name="kw_cat_id"]').val();
            // }
            clearTimeout(keyword_Input);
            keyword_Input = setTimeout(function () {
                var ajaxTimeoutTest = $.ajax({
                    url: '/api/ajax/searchComplemented/',
                    timeout: 10000,
                    type: 'get',
                    dataType: 'html',
                    data: 'keywords=' + $.trim(val) + '&cat_id=' + cat_id,
                    success: function (html) {
                        if(html){
                            // $('.ajax-search-list-js',$search_result_list).remove();
                            // $search_result_list.append(html);
                            $('.search-result-list-js').html(html);
                            $(".ajax-search-hot-list-item-js").each(function (index, ele){
                                if (index <= 2) {
                                    $(this).find(".ajax-search-hot-list-index-js").html(index+1);
                                } else {
                                    $(this).find(".ajax-search-hot-list-index-js").html(index+1 + ".");
                                }
                                $(this).click(function () {
                                  ga('send', 'event', 'searchRecommend', 'click', 'middle_searchKeyword_text_181221');
                                })
                            })
                        }
                    },
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            ajaxTimeoutTest.abort();
                        }
                        $search_result_list.show();
                    },
                    error:function(){
                        $search_result_list.show();
                    }
                });
            }, 300);
        },
        word_limit:function () {
            var val = $("#keywords").val();
            if(val.length>200){
                sub_val=val.substring(0,200);
                $("#keywords").val(sub_val);
            }
        }
    };
    $('.header-search-keyword-input-js',$search_form).focus(function () {
        if($.trim($(this).val()) == rand_keyword){
            $(this).val('').removeClass('colors_gray');
        }
        $search_form_obj.getSearchKeywords($(this).val())
        $search_result_list.hide();
    }).keyup(function () {
        $search_form_obj.word_limit()
        $search_form_obj.getSearchKeywords($(this).val())
    })
    // .click(function (event) {
    //     event.stopPropagation();
    // })
    $(document).delegate(".ajax-search-list-js li", "click",function (event) {
        $('.header-search-keyword-input-js',$search_form).val($('span',$(this)).text());
        // location.href = $(this).attr('url');
        var url = $(this).data('searchUrl');
        if (url) {
            location.href = url;
        }
        event.stopPropagation();
    });
    $('.header-search-icon-submit-js').click(function () {
        if($('#keywords').attr('url') && rand_keyword == $.trim($('#keywords').val())){
            window.open($('#keywords').attr('url'));
            return false;
        }
        $search_form_obj.word_limit();
        $(this).closest('form').submit();
    })
    $(document).delegate(".header-search-clear-history-js", "click",function (event) {
        var histroy_name = $(this).attr('data');
        var this_ul=$(this).closest('ul');
        $.ajax({
            url: '/api/ajax/delSearchHistory/',
            type: 'get',
            timeout: 10000,
            dataType: 'json',
            data: 'keywords=' + histroy_name,
            success: function (obj) {

            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    ajaxTimeoutTest.abort();
                }
            }
        });
        $(this).closest('li').remove();
        if(!$('li',this_ul).length){
            $('.ajax-search-recent-list-title-js').remove();
        }
        event.stopPropagation();
    });
    $(document).delegate(".header-search-clear-all-history-js", "click",function (event) {
        $.ajax({
            url: '/api/ajax/delAllSearchHistory/',
            timeout: 10000,
            type: 'get',
            dataType: 'json',
            success: function (obj) {
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    ajaxTimeoutTest.abort();
                }
            }
        });
        $(this).closest('.ajax-search-list-js').find(".ajax-search-recent-list-js").remove();
        $(this).closest('.ajax-search-list-js').find('.ajax-search-recent-list-title-js').remove();
        event.stopPropagation();
    });

    /* 20181126 */
    $(document).on('click','body',function (event) {
        if(!$(event.target).hasClass('header-search-keyword-input-js')){
            $search_result_list.hide();
        }
    });

})

/*头尾部改版*/
$(function () {
    var $home=$('.home_index_head');
    var pageScrollPosition=0,tempPageScrollPosition=0;//初始化判断是否上下的变量
    $.coutnav=function () {
        var head_height=$('.header-top-container-js',$home).outerHeight()+$('.nav',$home).outerHeight();
        if($('.special-publicize',$home).length){
            head_height=head_height+45;
        }
        $home.css('height',head_height+'px');
    }
    $.coutnav();
    $(window).scroll(function(e){
        var $indexfix=$('.index_head_cont',$home)
        $('.cate_nav',$home).removeClass('cate_nav_fixed');
        if ($(window).scrollTop() > 0) {
            $indexfix.addClass('head_cont_fix');
        } else {
            $indexfix.removeClass('head_cont_fix');
        }

        pageScrollPosition = $(this).scrollTop();
        if(tempPageScrollPosition<=pageScrollPosition){//下滚
            $('.header-top-set-outer-js').stop().hide();
        } else {//上滚
            $('.header-top-set-outer-js').stop().show();
        }
        setTimeout(function(){
            tempPageScrollPosition = pageScrollPosition;
            if(tempPageScrollPosition==0){
                $('.header-top-set-outer-js').stop().show();
            }
        },0);
    });

    /*var domeleft=$('#head_cart_num').closest('span').offset().left+$('#head_cart_num').closest('span').outerWidth();
    var windleft=$(window).width()
    if( domeleft> windleft && domeleft > 1200){
        var pd=domeleft-1200;
          console.log(domeleft+'-'+windleft+'='+pd);
        $('#head_cart_num').closest('.head_right').css('paddingRight',pd)
    }
    $('.live-chat').mouseenter(function () {
        setTimeout(function () {
            if($('.chat-tips-container').offset().left <0){
                $('.chat-tips-container').addClass('change')
            }
        },0)
    })*/

    $('.foot_sumt','.foot_new').click(function () {
        var $foot_sumt=$(this);
        var email_val=$.trim($foot_sumt.closest('.footer-sub-submit-js').find('input').val());
        var email_reg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,13}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        if(!email_reg.test(email_val)){
            $.alert($foot_sumt.data('msg'));
            return false;
        }
        $foot_sumt.loading(true);
        $.ajax({
            url:'/api/ajax/btmSubscribe/',
            dataType:'json',
            data:{email:email_val},
            success: function(res) {
                if(res.status === 1){
                    location.href='/subscribing.html';
                }else{
                    $.alert(res.message);
                }
                $foot_sumt.loading(false);
            }
        });
    })
    
    $('.footer-sub-submit-js input').on('input',function(){
        if($(this).val() == '') {
            $('.footer-email-holder-js').show();
        } else {
            $('.footer-email-holder-js').hide();
        }
    })
})
