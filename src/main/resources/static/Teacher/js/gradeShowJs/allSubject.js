

var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;

var allSubject_sub="语文";
var allSubject_test="test1";
var allSubject_Stugrade=new Array();  //存储学生成绩
//监听下拉框值变化事件，注意layui中不能使用js中的onChange进行监听，使用form.on方法加过滤器
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;

    form.on('select(testSelect)', function (data) {
        // alert(data.value);
        allSubject_test=data.value;
        //allSubpt_getJson(); //下拉框中的值发生变化，则刷新echarts
    });
});
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;

    form.on('select(subjectSelect)', function (data) {
        // alert(data.value);
        allSubject_sub=data.value;
        //allSubpt_getJson(); //下拉框中的值发生变化，则刷新echarts
    });
});

    $(function () { //页面初始化加载
        allSubject_getGrade();
    })

        function allSubject_getGrade() {
            var URL="../../../classlessonscore?id=100000001&lesson=语文&test=test3";
            allSubject_Stugrade.splice(0,allSubject_Stugrade.length); //清空数组
            var temp_stunumber;var temp_stuname;var temp_stuscore;var temp_rank; //存储从服务器返回的学号、姓名、班级、排名
            $("#allgrade_table  tr:not(:first)").empty("");  //清除除首行外的所有行

            $.ajax({
                url: "../../../classlessonscore?id="+classId+"&lesson="+allSubject_sub+"&test="+allSubject_test,//请求url
                type: "GET",	//请求类型  post|get
                // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
                dataType: 'json',//返回数据的 类型 text|json|html--
                crossDomain: true,
                async:false,
                success: function (json) {	//回调函数 和 后台返回的 数据
                    $.each(json, function (i, n) {
                        temp_stunumber=n.student_id;
                        temp_stuname=n.name;
                        temp_stuscore=n.score;
                        temp_rank=i+1;
                        $("#allgrade_table").append("<tr>" +
                            "<td  style=\"text-align: center\">" +  temp_stunumber +"</td>"
                            +"<td style=\"text-align: center\">" +  temp_stuname +"</td>"
                            +"<td style=\"text-align: center\">" +  temp_stuscore +"</td>"
                            +"<td style=\"text-align: center\">" +  temp_rank +"</td>"
                           + "</tr style=\"text-align: center\">");

                        //$("#pointSelect").append("<option value=" + temp + ">" + temp + "</option>")
                       // subjectKnowPoints.push(temp);
                       // renderForm();  //重新渲染表单
                    });
                }
            });


        }

    function searchUrl(){   //点击搜索按钮，判断两个下拉框的状态进行选择调用不同的函数(向服务器请求数据)
        allSubject_getGrade();

    }
