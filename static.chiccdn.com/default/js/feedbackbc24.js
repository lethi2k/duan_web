$(function () {
    var getMsg = function(elmName, type/* valudate type*/) {
        type = type || 'required';
        return $(':input[name="' + elmName + '"]').data('msg-' + type) || $.validator.messages[type] || '';
    };
    $.validator.setDefaults({
        errorPlacement: function(error, element) {  
            error.appendTo(element.parents('dd'));  
        },
        errorClass: 'error-block'
    });
    $('.form-feedback').validate({
        rules: {
            'order-number': {
                required: true
            },
            sku: 'required',
            email: {
                required: true,
                email: true
            },
            'question-type': 'required',
            description: 'required',
            'video-url': 'url'
        },
        messages: {
            'order-number': {
                required: getMsg('order-number')
            },
            sku: {
                required: getMsg('sku')
            },
            email: {
                required: getMsg('email'),
                email: getMsg('email', 'email')
            },
            'question-type': {
                required: getMsg('question-type')
            },
            description: {
                required: getMsg('description')
            },
            'video-url': {
                required: getMsg('video-url', 'url')
            }
        },
        submitHandler: function (form) {
            var $btn = $('.btn-submit').loading(),
                imgArray = [];
            $('#photo-list img').each(function () {
                // imgArray.push($(this).attr('src'));
                imgArray.push($(this).attr('imgPath'));
            });
            $.ajax({
                url: '/api/article/feedbackSubmit/',
                type: 'post',
                dataType: 'json',
                data: {
                    orders: $.trim($('input[name="order-number"]').val()),
                    email: $.trim($('input[name="email"]').val()),
                    category_id: $.trim($('select[name="question-type"]').val()),
                    sku: $.trim($('input[name="sku"]').val()),
                    questions_content: $.trim($('textarea[name="description"]').val()),
                    video_url: $.trim($('input[name="video-url"]').val()),
                    uploadImg: imgArray
                },
                success: function (result) {
                    if (result.status == 1){
                        $.alert(result.msg);
                        form.reset();
                        $('#photo-list').html('');
                    } else {
                        $.alert(result.errTip);
                    }
                },
                complete: function () {
                    $btn.loading(false);
                }
            });
            return false;
        }
    });
    
    // 上传图片
    $(document).on('click','.btn-upload-file',function(){
        $(this).siblings('input[name="Filedata"]').trigger('click');
    }).on('change','input[name="Filedata"]',function(){
        var me = this,
            file = this.value,
            type=file.substring(file.lastIndexOf(".")+1,file.length).toLowerCase(),
            msg = $(this).attr('msg'),
            imsg = $(this).attr('imsg');
            $photoList = $('#photo-list');
        // if(type!="jpg"&&type!="gif"&&type!="png"&&type!="jpeg"){                
        //     ZSAlert(msg, 'Tips', 'Done');
        //     return false;
        // }
        if($photoList.find('li').length > 4){
            this.value = '';
            ZSAlert('You can upload Max 5 images', 'Tips', 'Done');
            return false;
        }
  
        // // 用户上传图片
        /*
        $.ajaxFileUpload({
            url:'/api/article/uploadImg/',
            secureuri:false,
            fileElementId:'avatar',
            dataType: 'json',
            //data:{t:'uploadAvatarsImage'},
            success: function (result, status){
                if (result.status == 1){
                    $photoList.append('<li><div><img src="' + result.imgpath + '" imgPath="' + result.path + '" imgName="' + result.imgName + '"><i class="remove">×</i></div></li>');
                    me.value = '';
                } else {
                    $.alert(result.errTip);
                }                
            },
            error: function (data, status, e){
                $.alert(imsg);
            }
        });
        */

        $.upload({
            $fileInput:$(me),
            inputName:'Filedata',
            url: '/api/article/uploadImg/',
            successCallBack:function(res){
                if (res.status == 1){
                    $photoList.append('<li><div><img src="' + res.imgpath + '" imgPath="' + res.path + '" imgName="' + res.imgName + '"><i class="remove">×</i></div></li>');
                    // me.value = ''; // 置空input,ie下会触发两次change 事件
                } else {
                    $.alert(res.errTip);
                }   
            }
        })

        return false;
        
    }).on('click', '#photo-list .remove', function(){
        
        var $li = $(this).closest('li').loading(),
            hp_imgPath = $li.find('img')[0].src,
            imgPath = $li.find('img').attr('imgPath'),
            // imgName = hp_imgPath.substring(hp_imgPath.lastIndexOf('/') + 1);
            imgName = $li.find('img').attr('imgName');
        $.ajax({
            url: '/api/article/ajaxRemoveImage/',
            type:'post',
            dataType: 'json',
            data: {
                imageName: imgName,
                imgpath: imgPath
            },
            success: function (result) {
                console.log(result);
                if (result.status == 1){
                    $li.remove();
                } else {
                    $.alert(result.errTip);
                }   
            },
            complete: function () {
                $li.loading(false);
            }
        });
        
    });
});