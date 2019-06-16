
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var  studentId="";
/*单科成绩,某一学生历次考试的单科成绩*/
var singleSubpoint_subject="语文";
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    //监听表单中的考试科目
    form.on('select(subjectSelect)', function (data) {
        //alert(data.value);
        singleSubpoint_subject=data.value;
        singleSubpoint_getJson();
    });
});

$(function () {
    //学生登陆后，通过"账户"检索"学生学号",,将"学号"存储在Cookie中
    if($.cookie('studentId')!=null){   //进行判空操作
        studentId=$.cookie('studentId');
        classId=studentId.toString().substring(0,9);
    }else {
        studentId=10000000141;
        classId=100000001;
    }

    singleSubpoint_getJson();
})

function  singleSubpoint_getJson(){
    var testName=['test1','test2','test3','test4','test5','test6','test7'];  //所有的考试
    var scoreList= new Array(7);  //7次考试单科成绩排分数信息
    scoreList.splice(0,scoreList.length);
    var temp;
    /*var URL="http://www.overlove.xin/ssm/classlessonscore?id=" + classId + "&lesson=" + echart3_subject + "&test=" + testName[1];	//请求url
    console.log("URL: "+URL);*/
    for(var j=0;j<7;j++) {  //循环7次使用ajax获取数据
        // console.log("for start work");
        $.ajax({
            //http://www.overlove.xin/ssm/classlessonscore?id=100000001&lesson=语文&test=test3
            url: "classlessonscore?id=" + classId + "&lesson=" + singleSubpoint_subject + "&test=" + testName[j],	//请求url
            //url:"http://www.overlove.xin/ssm/classlessonscore?id=100000001&lesson=语文&test=test3",
            type: "GET",	//请求类型  post|get
            // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async:false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                //var stus = JSON.parse(users);
                $.each(json, function (i, n) {
                    if(n.student_id==studentId)
                    {
                        temp = n.score;   //存储每次考试的成绩
                    }
                });
            }
        }).done(scoreList[j] = temp);   //ajax执行完成后的回调函数;
    }

    var myChart = echarts.init(document.getElementById("singleSubpoint_chart"));
    option = {
        color: ['#3398DB'],
        tooltip : {
            show:true,
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
       
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : testName,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                    textStyle:{
                        color:'black',
                        fontSize: 20,
                        fontStyle:'normal',
                        fontWeight:'normal'

                    }

                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{
                    textStyle:{
                        color:'black',
                        fontSize: 20,
                        fontStyle:'normal',
                        fontWeight:'normal'

                    }

                },
            }
        ],
        series : [
            {
                name:'成绩',
                type:'bar',
                barWidth: '60%',
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
                data:scoreList,
            }
        ]
    };
    myChart.setOption(option);

}