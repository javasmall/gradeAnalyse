
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var studentId="";

var upload_test="";  //之后用于拼接地址
var upload_subject="";
var upload_questionNumber="";
var knowleagepoint="";//题目所属知识点


//上传题目的时候加判断，如果该次考试该科目下该道题已经上传，，那么上传同一题号的话就报错,,根据该题号下返回的错题图片URL是否为空进行判断
$(function () { //在界面初始化的时候，对考试和科目中的列表项进行加载

    //学生登陆后，通过"账户"检索"学生学号",,将"学号"存储在Cookie中
    if($.cookie('studentId')!=null){   //进行判空操作
        studentId=$.cookie('studentId');
        classId=studentId.toString().substring(0,9);
       
    }else {
        studentId=10000000141;
        classId=100000001;
    }
    $('#upload_studentid').val(studentId); //学生学号赋值给表单隐藏类型的数据

    /*/var subject=$('#subjectSelect').val(); //取出科目下拉列表选中的值
    alert(subject);*/
    for(var i=1;i<=7;i++){   //动态加载考试名称
        var j="test"+i+"";
        $("#upload_selectTest").append("<option value=" +j+ ">" +j+ "</option>")
    }

    for(var i=1;i<=26;i++){   //动态加载题号
        var j=i+"";
        $("#qtnumberSelect").append("<option value=" +j+ ">" +j+ "</option>");
    }

});


//前台layui-card需要依赖element模块才能使用，，前台的select下拉框也通过此方式进行显示
//选择错题所属的考试
layui.use(['layer', 'form'], function () {
    //每次选择列表中的值，都会调用该函数，完成对地址拼接中参数的赋值，以及表单隐藏元素，，并且调用upload_getJson()获取当前题目的知识点
    var layer = layui.layer;
    var form = layui.form;
    //监听表单中的考试名称
    form.on('select(upload_selectTest)', function (data) {
        //alert(data.value);
        upload_test=data.value;
        $('#upload_testName').val(upload_test); //考试类型赋值给表单隐藏类型的数据
        upload_getJson();
        //singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

//选择错题所属的科目
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    //监听表单中的考试名称
    form.on('select(subjectSelect)', function (data) {
        upload_subject=data.value;
        $('#upload_testSubject').val(upload_subject); //考试科目赋值给表单隐藏的数据类型
        upload_getJson();  //下拉框中的值发生变化，则刷新题目知识点
    });
});
//选择错题的题号
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    form.on('select(qtnumberSelect)', function (data) {
        if(data.value!=null){
            //alert(data.value);
        }
        if(upload_subject=="语文"){
            if(data.value>17){
                alert("抱歉！题号错误！不能上传！");
            }
            else {
                upload_questionNumber=data.value;
                $('#upload_numid').val(upload_questionNumber);  //题号赋值给input中的隐藏题号
                upload_getJson();  //获取题目类型数据
            }
        }
        if(upload_subject=="数学"){
            if(data.value>20){
                alert("抱歉！题号错误！不能上传！");
            }
            else {
                upload_questionNumber=data.value;
                $('#upload_numid').val(upload_questionNumber);  //题号赋值给input中的隐藏题号
                upload_getJson();  //获取题目类型数据
            }
        }
        if(upload_subject=="英语") {
            if (data.value > 26) {
                alert("抱歉！题号错误！不能上传！");
            }
            else {
                upload_questionNumber=data.value;
                $('#upload_numid').val(upload_questionNumber);  //题号赋值给input中的隐藏题号
                upload_getJson();  //获取题目类型数据
            }
        }


       // upload_questionNumber=data.value;
        //singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

function upload_getJson() {   //根据学科题号,寻找知识点
    //var URL="/getproblemstylebyid?problemid=" +upload_questionNumber+ "&lesson="+upload_subject+"&testname="+upload_test;
    var temp;  //临时存储题目类型
    $.ajax({
        url: "../../../getproblemstylebyid?problemid=" +upload_questionNumber+ "&lesson="+upload_subject+"&testname="+upload_test,	//请求url
        type: "GET",	//请求类型  post|get
        // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
        dataType: 'json',//返回数据的 类型 text|json|html--
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                temp=n.question_kownledge;
                knowleagepoint=temp;
            });
//}
        }
    });
    $('#upload_knowleagePoint').val(knowleagepoint);  //获得题目类型并将其赋给form中的hidden元素
}