
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var  studentId="";
/*三总成绩*/
$(function () {
    //学生登陆后，通过"账户"检索"学生学号",,将"学号"存储在Cookie中
    if($.cookie('studentId')!=null){   //进行判空操作
        studentId=$.cookie('studentId');
        classId=studentId.toString().substring(0,9);
    }else {
        studentId=10000000141;
        classId=100000001;
    }

    var testName=['test1','test2','test3','test4','test5','test6','test7'];
    var sumscoreList= new Array(7);  //每次考试总成绩
    var temp;
    //每次刷新echarts时首先清空数组
    sumscoreList.splice(0,sumscoreList.length);
    //stuList.splice(0,stuList.length); //每次加载界面先删除之前的数据，避免在画布上重复渲染
    function getJson() {
        for(var i=0;i<7;i++) { //获取所有考试的三科总成绩
            // var URL="http://www.overlove.xin/ssm/studentrank?test=" +testName[i]+ "&classid="+classId;
            $.ajax({
                url: "studentrank?test=" +testName[i]+ "&classid="+classId,	//请求url
                type: "GET",	//请求类型  post|get
                dataType: 'json',
                crossDomain: true,
                async:false,
                success: function (json) {	//回调函数 和 后台返回的 数据

                    $.each(json, function (i, n) {

                        if(n.student_id==studentId) {
                            temp=n.sumscore;
                        }

                    });
//}
                }
            }).done(sumscoreList[i]=temp);   //ajax执行完成后的回调函数


        }
    }
    getJson();
    if(sumscoreList[2]!="" && sumscoreList[1]!="") {
        for (var i = 0; i < 7; i++) {
            //console.log("stucoreList" + i + ":" + sumscoreList[i]);
        }
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('threeSum_chart'));
    // 使用刚指定的配置项和数据显示图表。
    option = {

        color: ['#8B658B'],

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: testName,
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

                }
            }
        ],
        yAxis: {
            type: 'value',
            axisLabel:{
                textStyle:{
                    color:'black',
                    fontSize: 20,
                    fontStyle:'normal',
                    fontWeight:'normal'

                }

            },
        },
        series: [{
            name: '总成绩',
            type: 'scatter',
            symbolSize: 20,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'red',
                            fontSize: 16
                        }
                    }
                }
            },
            data: sumscoreList,

        }]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
});