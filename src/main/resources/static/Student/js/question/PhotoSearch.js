
//"图片上传"逻辑代码
layui.use('upload', function() {
    var $ = layui.jquery
        , upload = layui.upload;
    upload.render({
        elem: '#dragPic'
        , url: '../../../ocrimg'
        ,size:100   //单位kb
        , auto: false   //禁止自动上传
        //,multiple: true
        , bindAction: '#upload'
        , done: function (res) {
            //console.log(res)
        }
    });
});

