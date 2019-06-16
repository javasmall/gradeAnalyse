
var studentId="";   //1 学号
// var upload_test="";  //之后用于拼接地址
var upload_subject="";  //2 学科
var knowleagepoint="";//3 知识点

$(function () {

    // //学生登陆后，通过"账户"检索"学生学号",,将"学号"存储在Cookie中
    // if($.cookie('studentId')!=null){   //进行判空操作
    //     studentId=$.cookie('studentId');
    //     classId=studentId.toString().substring(0,9);
    // }else {
    //     studentId=10000000141;
    //     classId=100000001;
    // }

    $('#upload_studentid').val('10000000141');
    $('#upload_testSchool').val('just');

    //前台layui-card需要依赖element模块才能使用，，前台的select下拉框也通过此方式进行显示
//选择错题所属的科目
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer;
        var form = layui.form;
        //监听表单中的考试科目
        form.on('select(subjectSelect)', function (data) {
            // alert(data.value);
            upload_subject=data.value;
            $('#upload_testSubject').val(upload_subject); //考试类型赋值给表单隐藏类型的数据
            upload_getJson();
            //singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
        });
    });

//所要上传题目的知识点类型
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer;
        var form = layui.form;
        form.on('select(knowpoint)', function (data) {
            // alert(data.value);
            knowleagepoint=data.value;
            $('#upload_knowleagePoint').val(knowleagepoint); //考试科目赋值给表单隐藏的数据类型
        });
    });

});







