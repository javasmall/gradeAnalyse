var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
// var studentId=10000000141;   //登陆之后通过cookie将登录信息取出来

//layui中的数据表格

var threeSubject_test="test1";
var threeSubject_Stugrade=new Array();  //存储学生成绩

layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    form.on('select(testSelect)', function (data) {
        // alert(data.value);
        threeSubject_test=data.value;
        //allSubpt_getJson(); //下拉框中的值发生变化，则刷新echarts
    });
});

$(function () { //页面初始化加载
    threeSubject_getGrade();
})

function threeSubject_getGrade() {
    var URL="../../../studentrank?test=test1&classid=100000001";
    var temp_stunumber;var temp_stuname;var temp_stuscore;var temp_rank; //存储从服务器返回的学号、姓名、班级、排名
    
    $("#threegrade_table  tr:not(:first)").empty("");  //清除除首行外的所有行

    $.ajax({
        url: "../../../studentrank?test="+threeSubject_test+"&classid="+classId,//请求url
        type: "GET",	//请求类型  post|get
        // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
        dataType: 'json',//返回数据的 类型 text|json|html--
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                temp_stunumber=n.student_id;
                temp_stuname=n.student_name;
                temp_stuscore=n.sumscore;
                temp_rank=i+1;
                $("#threegrade_table").append("<tr>" +
                    "<td  style=\"text-align: center\">" +  temp_stunumber +"</td>"
                    +"<td style=\"text-align: center\">" +  temp_stuname +"</td>"
                    +"<td style=\"text-align: center\">" +  temp_stuscore +"</td>"
                    +"<td style=\"text-align: center\">" +  temp_rank +"</td>"
                    + "</tr style=\"text-align: center\">");

            });
        }
    });


}

function searchUrl(){   //点击搜索按钮，判断两个下拉框的状态进行选择调用不同的函数(向服务器请求数据)
    
    //通过判断两个下拉框中的值，调用不同方法
    threeSubject_getGrade();

}
