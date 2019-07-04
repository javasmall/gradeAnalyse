
var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;
var oneSubjectTrend_subject="语文";
/*科目选定后，查询按钮的点击事件,用于显示数据*/
    function searchUrl(){   //点击搜索按钮，判断两个下拉框的状态进行选择调用不同的函数(向服务器请求数据)
        //通过判断两个下拉框中的值，调用不同方法
        oneSubjectTrend_getTrend_table();
        oneSubjectTrend_getTrend_echarts();
    }

    layui.use(['layer', 'form'], function () { //下拉框选择科目
        var layer = layui.layer;
        var form = layui.form;
        form.on('select(subjectSelect)', function (data) {
            oneSubjectTrend_subject=data.value;
        });
    });


$(function (){ //页面初始化加载
        oneSubjectTrend_getTrend_table(); //加载表格
        oneSubjectTrend_getTrend_echarts(); //渲染echarts
    })

    /*表格展示单科平均分的走势情况*/
    function oneSubjectTrend_getTrend_table() {
        // var URL="../../../pastlessonavg?id=100000001&lesson=语文";
        var temp_table_testname;var temp_table_avgscore;var temp_table_rank; //存储从服务器返回的学号、姓名、班级、排名
        $("#oneSubjectTrend_table  tr:not(:first)").empty("");  //清除除首行外的所有行

        $.ajax({
            url: "../../../pastlessonavg?id="+classId+"&lesson="+oneSubjectTrend_subject,//请求url
            type: "GET",	//请求类型  post|get
            // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async:false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                $.each(json, function (i, n) {
                    temp_table_testname=n.test_name;
                    temp_table_avgscore=n.avgscore;
                    temp_table_rank=n.avgrank;
                $("#oneSubjectTrend_table").append("<tr>" +
                    "<td  style=\"text-align: center\">" +  temp_table_testname +"</td>"
                    +"<td style=\"text-align: center\">" +  temp_table_avgscore +"</td>"
                    +"<td style=\"text-align: center\">" +  temp_table_rank +"</td>"
                    + "</tr style=\"text-align: center\">");

                // renderForm();  //重新渲染表单
                });
            }
        });
    }

    /*echarts绘制的那刻平均分的走势*/
    function oneSubjectTrend_getTrend_echarts(){
        var testName=['test1','test2','test3','test4','test5','test6','test7'];  //所有的考试
        var rankList= new Array(7);  //7次考试班级科目平均分走势信息
        rankList.splice(0,rankList.length);
        var temp_echarts_avgsore;

        function getJson() {  //填充rankList
                $.ajax({
                    url: "../../../pastlessonavg?id="+classId+ "&lesson="+oneSubjectTrend_subject,	//请求url
                    type: "GET",
                    dataType: 'json',
                    crossDomain: true,
                    async:false,
                    success: function (json) {	//回调函数 和 后台返回的 数据

                        $.each(json, function (i, n) {
                            temp_echarts_avgsore=n.avgscore;
                            rankList.push(temp_echarts_avgsore);
                        });
                    }
                });
        }


        getJson();
       

        var myChart = echarts.init(document.getElementById('oneSubjectTrend_chart'));
         option = {

            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: testName
            },
            yAxis: {
                type: 'value',
                data:rankList,
            },
            series: [{
                name:'平均分',
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
    }
