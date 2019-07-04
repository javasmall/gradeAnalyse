
var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;
/*三总成绩*/
$(function () {
    var testName=['test1','test2','test3','test4','test5','test6','test7'];
    var sumscoreList= new Array(7);  //每次考试总成绩
    var temp;

    sumscoreList.splice(0,sumscoreList.length); //清空数组
    function getJson() {
        for(var i=0;i<7;i++) { //获取所有考试的三科总成绩
            var URL="../../../studentrank?test=" +testName[i]+ "&classid="+classId;
           
            $.ajax({
                url: "../../../studentrank?test=" +testName[i]+ "&classid="+classId,	//请求url
                type: "GET",	//请求类型  post|get
                // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
                dataType: 'json',//返回数据的 类型 text|json|html--
                crossDomain: true,
                async:false,
                success: function (json) {	//回调函数 和 后台返回的 数据

                    $.each(json, function (i, n) {
                        /
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

    //echarts渲染
    var myChart = echarts.init(document.getElementById('threeSum_chart'));
    // 使用刚指定的配置项和数据显示图表。
    option = {

        color: ['#8B658B'],

        /*legend:{
            name:'test2考试中各个班级的语文平均分',  //详细的考试成绩信息，，未能显示！！
        },*/

        /*title: {
            left: 'center',
            text: '',
        },*/
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
                }
            }
        ],
        yAxis: {
            type: 'value'
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