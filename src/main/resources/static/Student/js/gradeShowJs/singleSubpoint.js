
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var  studentId="";
/*单科成绩,某一学生历次考试的单科成绩*/
var singleSubpoint_subject="语文";
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    //console.log("form is: "+form);
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
        //console.log("studentID is: "+$.cookie('studentId'));
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

        $.ajax({
            url: "../../../pastlessonrank?id=" + studentId + "&lesson=" + singleSubpoint_subject + "&type=classrank" ,	//请求url
            type: "GET",
            dataType: 'json',
            crossDomain: true,
            async:false,
            success: function (json) {
                //var stus = JSON.parse(users);
                $.each(json, function (i, n) {
                        scoreList[i] = n.lesson_score;//存储每次考试的成绩
                });
            }
        })   //ajax执行完成后的回调函数;


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
        /*legend:{
            name:'test2考试中各个班级的语文平均分',  //详细的考试成绩信息，，未能显示！！
        },*/

        /*title: {
            left: 'center',
            text: '某次考试中该班级的某学科平均分',
        },*/
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
                        fontSize: 18,
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
                        fontSize: 18,
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