
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var  studentId="";

/*三总排名*/
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

    var testName=['test1','test2','test3','test4','test5','test6','test7'];  //所有的考试
    var rankList= new Array(7);  //7次考试3总成绩排名信息
    var temp;
    function getJson() {

            // console.log("testName: "+testName[j]);
            $.ajax({
                url: "../../../pastrank?id=" +studentId+ "&type=classrank",	//请求url
                type: "GET",	//请求类型  post|get
                // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
                dataType: 'json',//返回数据的 类型 text|json|html--
                crossDomain: true,
                async:false,
                success: function (json) {	//回调函数 和 后台返回的 数据

                    $.each(json, function (i, n) {
                        //获取对象中属性为optionsValue的值
                        //testName.push(parseInt(n.test_name));
                        //subjectName.push(n.lesson_ame);
                             temp=n.rank1;
                        rankList[i]=temp;
                    });


                }
            })
                // .done(rankList[j]=temp);   //ajax执行完成后的回调函数

    }


    getJson();


    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('threeRank_chart'));
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
            axisLabel:{
                textStyle:{
                    color:'black',
                    fontSize: 20,
                    fontStyle:'normal',
                    fontWeight:'normal'

                }

            },
        },
        yAxis: {
            type: 'value',
            data:rankList,
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
            name:'班级排名',
            data: rankList,
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
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);  //渲染区域
    window.addEventListener("resize", function () {
        myChart.resize();
    });
});
