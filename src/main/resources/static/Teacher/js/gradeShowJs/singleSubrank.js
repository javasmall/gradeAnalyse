
var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;
/*单科排名，学生历次考试在班级中的单科排名*/
//chart4_subjectSelect
var singleSubrank_subject="语文";
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form();
    
    //监听表单中的考试科目
    form.on('select(subjectSelect)', function (data) {
        //alert(data.value);
        singleSubrank_subject=data.value;
        singleSubrank_getJson();
    });
});

$(function () { //界面初始化加载
    singleSubrank_getJson();
})

function singleSubrank_getJson(){
    var testName=['test1','test2','test3','test4','test5','test6','test7'];  //所有的考试
    var chart4_rankList= new Array(7);  //7次考试单科成绩排分数信息
    chart4_rankList.splice(0,chart4_rankList.length);
    var temp;
 
    var URL="../../../classlessonscore?id=" + classId + "&lesson=" + singleSubrank_subject + "&test=" + testName[1];	//请求url
    
    for(var j=0;j<7;j++) {  //循环7次使用ajax获取数据
        
        $.ajax({
            //../../../classlessonscore?id=100000001&lesson=语文&test=test3
            url: "../../../classlessonscore?id=" + classId + "&lesson=" + singleSubrank_subject + "&test=" + testName[j],	//请求url
            //url:"../../../classlessonscore?id=100000001&lesson=语文&test=test3",
            type: "GET",	//请求类型  post|get
            // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async:false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                //var stus = JSON.parse(users);
                $.each(json, function (i, n) {
                    //testName.push(parseInt(n.test_name));
                    //subjectName.push(n.lesson_ame);
                    // stuList.push(parseInt(n.student_id) - 10000000000);
                    //pointList.push(parseInt(n.score));
                    if(n.student_id==studentId)
                    {
                        temp = i+1;   //存储每次考试班级排名
                       
                    }
                });
            }
        }).done(chart4_rankList[j] = temp);   //ajax执行完成后的回调函数;
    }

    


    var myChart = echarts.init(document.getElementById("singleSubrank_chart"));
    option = {
        /*title : {
            left:'center',
            text: '历次考试中班级语文成绩排名',
        },*/
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: testName,
        },
        yAxis: {
            type: 'value',
            data:chart4_rankList,
        },
        series: [{
            name:'班级排名',
            data: chart4_rankList,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16
                        }
                    }
                }
            },
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}