
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var  classId="";
//var studentId=10000000141;
var studentId="";

/*本分析保护js文件中，用到的函数比较多，尤其是数组，在不同测试下，注意清空数组*/

//layui中的数据表格
var report_testName="test1";
var chinese_grade_Jsons=new Array();
var chinese_style_Jsons=new Array();

var math_grade_Jsons=new Array();
var math_style_Jsons=new Array();

var English_grade_Jsons=new Array();
var English_style_Jsons=new Array();

/*成绩排名预测所需变量*/
var chinese_gradeForecast_Jsons=new Array(7);  //存储该学生之前7次的考试成绩,,,目前只有7次考试数据,,成绩预测需要的7次成绩数据
var chinese_forecast_grade;  //存储预测的成绩
var chinese_rankFrocast_Jsons=new Array(7);  //7次排名数据
var chinese_forecast_rank;  //存储预测的排名

var math_gradeForecast_Jsons=new Array(7);
var math_forecast_grade;
var math_rankFrocast_Jsons=new Array(7);
var math_forecast_rank;

var English_gradeForecast_Jsons=new Array(7);
var English_forecast_grade;
var English_rankFrocast_Jsons=new Array(7);
var English_forecast_rank;

/*评价板块所需要的变量*/
/*装填评价所用到的数组*/
var chinse_rankEvaluation_Jsons=new Array();   //要根据选择的测试名称，即具体是哪次测试，来进行状态值的返回
var math_rankEvaluation_Jsons=new Array();
var English_rankEvaluation_Jsons=new Array();


  //layui中的下拉框监听事件
   function report_button_selectTest(){ //按钮点击事件
        report_testName= $("#report_input_testName").val(); //，获取输入框的内容
        Chinese_knowleagePoint_table();
        Chinese_questionType_table();

        Math_knowleagePoint_table();
        Math_questionType_table();

        English_knowleagePoint_table();
        English_questionType_table();

        chinese_analysis_test();  //进行状态的评价
        math_analysis_test();
        English_analysis_test();
    }

$(function () { //页面初始化加载函数,加载表格和echarts南丁格尔玫瑰图
    if($.cookie('studentId')!=null){
        studentId=$.cookie('studentId');
        classId=studentId.toString().substring(0,9);
    }else {
        studentId=10000000141;
        classId=100000001;
    }
    $('#count1').text(studentId.toString());  //学生学号获取成功

    /*知识点或题型得分分析*/
    Chinese_knowleagePoint_table();
    Chinese_questionType_table();

    Math_knowleagePoint_table();
    Math_questionType_table();

    English_knowleagePoint_table();
    English_questionType_table();

    chinese_analysis_test();  //进行状态的评价
    math_analysis_test();
    English_analysis_test();

})

    /*k考试评价，直接加载，因为评价数据量不大，可以直接显示,,,,*/
    //首先对学生的状态,,可以使用选择向服务器发送的数据为"排名"，，不使用分数,,
    function chinese_analysis_test() {  //前六次排名数据来评价该次考试的状态
            chinese_archive_beforeGrades();  //避免用户没有使用"成绩预测"功能,,,7次测试的数据

            chinse_rankEvaluation_Jsons.splice(0,chinse_rankEvaluation_Jsons.length); //每次使用注意清空数组

            var temp=report_testName.toString().substring(4);
            var temp_length=parseInt(temp);
            
            for(var i=0;i<temp_length;i++){
                chinse_rankEvaluation_Jsons[i]=chinese_rankFrocast_Jsons[i];
            }

        $('#chinese_analysis_status').text("");
         $.ajax({
            url:"../../../status",
            type:"GET",
             //async:true,
            data:{
                "list":chinse_rankEvaluation_Jsons   //之前所有考试的分数数组
            },
            traditional:true,   //设置为true,阻止深度序列化
            success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
                //Chinse_testEvaluation_status=data;
                if(data<0) {
                    //alert("Sorry! You are Redrssing");
                    $('#chinese_analysis_status').text("综合以往成绩来看，您这次没有进步啊！别气馁，继续努力呀！");
                }
                else{
                    //alert("Congratulation! You are Progressing");
                    $('#chinese_analysis_status').text("干得漂亮，您这次进步了呦！");
                }
            }
        });

        //薄弱知识点
        $('#chinese_analysis_weakKownPoint').text("");    //将上一次的信息清除
        var URL="../../../getmosterrorbypoint?testname=" +report_testName + "&lesson=语文&stuid="+studentId;
        var weakPoinr_flag=false;  //置标志状态量,只要存在薄弱知识点,该标志量就为true
        $.ajax({
            url: "../../../getmosterrorbypoint?testname=" +report_testName + "&lesson=语文&stuid="+studentId,	//获取成绩及排名
            //url:"../../../classlessonscore?id=100000001&lesson=语文&test=test3",
            type: "GET",	//请求类型  post|get
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async: false,   //将ajax设置为同步请求
            success: function (json) {	//回调函数 和 后台返回的 数据
                $.each(json, function (i, n) {
                    if(n.test_name == report_testName) {  //筛选取出数据
                        var count1 = parseInt(n.count1);
                        var allcount = parseInt(n.allcount);

                        if (count1 > allcount * 1 / 4) {
                            weakPoinr_flag = true;
                            var temp_weakKnownPoint = $('#chinese_analysis_weakKownPoint').text();
                            $('#chinese_analysis_weakKownPoint').text(temp_weakKnownPoint + " " + n.question_kownledge);
                        }
                    }
                });
                if(!weakPoinr_flag){  //说明不存在"薄弱知识点"
                    $('#chinese_analysis_weakKownPoint').text("暂时没有");
                }
            }
        });

        //薄弱题型
        $('#chinese_analysis_weakQuesStyle').text("");    //将上一次的信息清除，置空
        var weakPoinr_flag=false;  //置标志状态量,只要存在薄弱知识点,该标志量就为true
        $.ajax({
            url: "../../../getmosterrorbytype?testname=" +report_testName + "&lesson=语文&stuid="+studentId,	//获取成绩及排名
            type: "GET",	//请求类型  post|get
            dataType: 'json',
            crossDomain: true,
            async: false,   //将ajax设置为同步请求
            success: function (json) {	//回调函数 和 后台返回的 数据
                $.each(json, function (i, n) {
                    if(n.test_name == report_testName) {
                        var count1 = parseInt(n.count1);
                        var allcount = parseInt(n.allcount);
                        
                        if (count1 > allcount * 1 / 4 || count1 == allcount * 1 / 4) {
                            weakPoinr_flag = true;
                            var temp_weakKnownPoint = $('#chinese_analysis_weakQuesStyle').text();
                            $('#chinese_analysis_weakQuesStyle').text(temp_weakKnownPoint + " " + n.title_numbertype);
                        }
                    }

                });
                if(!weakPoinr_flag){  //说明不存在"薄弱知识点"
                    $('#chinese_analysis_weakQuesStyle').text("暂时没有");
                }
            }
        });

    }

    function math_analysis_test() {
        math_archive_beforeGrades();
        math_rankEvaluation_Jsons.splice(0,math_rankEvaluation_Jsons.length);

        
        var temp=report_testName.toString().substring(4);
        var temp_length=parseInt(temp);   //第几次考试,则向服务器请求的数组的长度就为几
        for(var i=0;i<temp_length;i++){
            math_rankEvaluation_Jsons[i]=math_rankFrocast_Jsons[i];
        }

        $('#math_analysis_status').text("");   //清空之前的分析状态
        $.ajax({
            url:"../../../status",
            type:"GET",
            async:true,
            data:{
                "list":math_rankEvaluation_Jsons   //之前所有考试的分数数组
            },
            traditional:true,
            success:function (data) {
                
                if(data<0) {
                    $('#math_analysis_status').text("综合以往成绩来看，您这次没有进步啊！别气馁，继续努力呀！");

                }
                else{
                    $('#math_analysis_status').text("干得漂亮，您这次进步了呦！");
                }
            }
        })

        //薄弱知识点,,数学只有薄弱知识点
        $('#math_analysis_weakKownPoint').text("");
        var weakPoinr_flag=false;  //置"薄弱知识点"标志状态量
        $.ajax({
            url: "../../../getmosterrorbypoint?testname=" +report_testName + "&lesson=数学&stuid="+studentId,	//获取成绩及排名
            type: "GET",
            dataType: 'json',
            crossDomain: true,
            async: false,
            success: function (json) {
                $.each(json, function (i, n) {
                    if(n.test_name == report_testName) {
                        var count1 = parseInt(n.count1);
                        var allcount = parseInt(n.allcount);
                        
                        if (count1 > allcount * 1 / 4) {
                            weakPoinr_flag = true;
                            var temp_weakKnownPoint = $('#math_analysis_weakKownPoint').text();
                            $('#math_analysis_weakKownPoint').text(temp_weakKnownPoint + " " + n.question_kownledge);
                        }
                    }

                });
                if(!weakPoinr_flag){  //说明不存在"薄弱知识点"
                    $('#math_analysis_weakKownPoint').text("暂时没有");
                }
            }
        });

    }

    function English_analysis_test () {
        English_archive_beforeGrades();

        English_rankEvaluation_Jsons.splice(0,English_rankEvaluation_Jsons.length); //每次使用注意清空数组

        var temp=report_testName.toString().substring(4);
        var temp_length=parseInt(temp);
        
        for(var i=0;i<temp_length;i++){
            English_rankEvaluation_Jsons[i]=English_rankFrocast_Jsons[i];
        }

        //对本次考试状态的评价
        $('#English_analysis_status').text("");
        $.ajax({
            url:"../../../status",
            type:"GET",
            async:true,
            data:{
                "list":English_rankEvaluation_Jsons
            },
            traditional:true,
            success:function (data) {
                if(data<0) {
                    $('#English_analysis_status').text("综合以往成绩来看，您这次没有进步啊！别气馁，继续努力呀！");

                }
                else{
                    $('#English_analysis_status').text("干得漂亮，您这次进步了呦！");
                }
            }
        });

        //薄弱题型,,,英语没有知识点，仅划分"薄弱题型"
        $('#English_analysis_weakQuesStyle').text("");
        var URL="../../../getmosterrorbypoint?testname=" +report_testName + "&lesson=英语&stuid="+studentId;
        var weakPoinr_flag=false;
        $.ajax({
            url: "../../../getmosterrorbytype?testname=" +report_testName + "&lesson=英语&stuid="+studentId,	//获取成绩及排名
            type: "GET",
            dataType: 'json',
            crossDomain: true,
            async: false,
            success: function (json) {
                $.each(json, function (i, n) {
                    if(n.test_name == report_testName) {
                        var count1 = parseInt(n.count1);
                        var allcount = parseInt(n.allcount);

                        if (count1 > allcount * 1 / 4 || count1 == allcount * 1 / 4) {
                            weakPoinr_flag = true;
                            var temp_weakKnownPoint = $('#English_analysis_weakQuesStyle').text();
                            $('#English_analysis_weakQuesStyle').text(temp_weakKnownPoint + " " + n.title_numbertype);
                        }
                    }

                });
                if(!weakPoinr_flag){  //说明不存在"薄弱知识点"
                    $('#English_analysis_weakQuesStyle').text("暂时没有");
                }
            }
        });
    }

    /*成绩预测*/
    //语文成绩预测
    function report_button_ChineseForecast() { //点击按钮，语文成绩预测，提交服务器获取预测数据,,仅查询语文成绩
        chinese_archive_beforeGrades(studentId);  //调用函数，获取之前的7次考试的成绩数据
        $.ajax({
            url:"../../../preview",
            type:"GET",
            data:{
                "list":chinese_gradeForecast_Jsons    //之前所有考试的分数数组
            },
            traditional:true,   //设置为true,阻止深度序列化
            success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
                chinese_forecast_grade=data.toString();
                $('#chinese_grade_forecast').text(chinese_forecast_grade.substring(0,3));  //取3位有效数字
            }
        })

        $.ajax({
            url:"../../../preview",
            type:"GET",
            data:{
                "list":chinese_rankFrocast_Jsons    //之前所有考试的分数数组
            },
            traditional:true,   //设置为true,阻止深度序列化
            success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
                chinese_forecast_rank=data.toString();
                //alert(data);
                //alert(chinese_forecast_rank.substring(0,3));
                $('#chinese_rank_forecast').text(chinese_forecast_rank.substring(0,3));  //为语文预测的排名span元素赋值
            }
        })
    }

    //数学成绩预测
    function report_button_MathForecast() { //点击按钮，语文成绩预测，提交服务器获取预测数据,,仅查询语文成绩
    math_archive_beforeGrades();  //调用函数，获取之前的7次考试的成绩数据
    $.ajax({
        url:"../../../preview",
        type:"GET",
        data:{
            "list":math_gradeForecast_Jsons    //之前所有考试的分数数组
        },
        traditional:true,   //设置为true,阻止深度序列化
        success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
            math_forecast_grade=data.toString();
            //alert(data);
            //alert(math_forecast_grade.substring(0,3));  //成绩预测成功
            $('#math_grade_forecast').text(math_forecast_grade.substring(0,4));  //为span元素赋值
        }
    })

    $.ajax({
        url:"../../../preview",
        type:"GET",
        data:{
            "list":math_rankFrocast_Jsons    //之前所有考试的分数数组
        },
        traditional:true,   //设置为true,阻止深度序列化
        success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
            math_forecast_rank=data.toString();
            //alert(data);
            //alert(chinese_forecast_rank.substring(0,3));
            $('#math_rank_forecast').text(math_forecast_rank.substring(0,2));  //为语文预测的排名span元素赋值
        }
    })
}
    //英语成绩预测
    function report_button_EnglishForecast() { //点击按钮，语文成绩预测，提交服务器获取预测数据,,仅查询语文成绩
    English_archive_beforeGrades();  //调用函数，获取之前的7次考试的成绩数据
    $.ajax({
        url:"../../../preview",
        type:"GET",
        data:{
            "list":English_gradeForecast_Jsons    //之前所有考试的分数数组
        },
        traditional:true,   //设置为true,阻止深度序列化
        success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
            English_forecast_grade=data.toString();
            $('#English_grade_forecast').text(English_forecast_grade.substring(0,4));  //为span元素赋值
        }
    })

    $.ajax({
        url:"../../../preview",
        type:"GET",
        data:{
            "list":English_rankFrocast_Jsons    //之前所有考试的分数数组
        },
        traditional:true,   //设置为true,阻止深度序列化
        success:function (data) {   //请求成功,服务器返回预测数据,,请求成功后的回掉函数
            English_forecast_rank=data.toString();
            //alert(data);
            //alert(chinese_forecast_rank.substring(0,3));
            $('#English_rank_forecast').text(English_forecast_rank.substring(0,2));  //为语文预测的排名span元素赋值
        }
    })
}


/*获取7次考试的成绩及排名,,然后对下一次的语文成绩以及排名进行预测*/
    function chinese_archive_beforeGrades() {
        var URL="../../../pastlessonrank?id=" + studentId + "&lesson=语文&type=classrank";
        
        chinese_gradeForecast_Jsons.splice(0,chinese_gradeForecast_Jsons.length);  //注意每次要将数组清空
        chinese_rankFrocast_Jsons.splice(0,chinese_rankFrocast_Jsons.length);

        var chinese_archive_grade;var chinese_archive_rank;
            $.ajax({
                url: "../../../pastlessonrank?id=" + studentId + "&lesson=语文&type=classrank",	//获取成绩及排名
                type: "GET",	//请求类型  post|get
                // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
                dataType: 'json',//返回数据的 类型 text|json|html--
                crossDomain: true,
                async: false,   //将ajax设置为同步请求
                success: function (json) {	//回调函数 和 后台返回的 数据
                    //var stus = JSON.parse(users);
                    $.each(json, function (i, n) {
                        //testName.push(parseInt(n.test_name));
                            chinese_archive_rank=n.rank1;
                            chinese_rankFrocast_Jsons.push(chinese_archive_rank); //存储考试排名,,该数组时全局变量
                            chinese_archive_grade=n.lesson_score;
                            chinese_gradeForecast_Jsons.push(chinese_archive_grade); //存储成绩信息

                       // }
                    });
                }
            });

    }

    /*获取数学学科的7次考试排名及成绩*/
    function math_archive_beforeGrades() {
        
        var URL="../../../pastlessonrank?id=" + studentId + "&lesson=数学&type=classrank";
        
        math_gradeForecast_Jsons.splice(0,math_gradeForecast_Jsons.length);  //注意每次要将数组清空
        math_rankFrocast_Jsons.splice(0,math_rankFrocast_Jsons.length);

        var math_archive_grade;var math_archive_rank;

       
        $.ajax({
            url: "../../../pastlessonrank?id=" + studentId + "&lesson=数学&type=classrank",	//获取成绩及排名
            type: "GET",	//请求类型  post|get
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async: false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                //var stus = JSON.parse(users);
                $.each(json, function (i, n) {
                    //testName.push(parseInt(n.test_name));

                    math_archive_rank=n.rank1;
                    math_rankFrocast_Jsons.push(math_archive_rank); //存储考试排名
                    

                    math_archive_grade=n.lesson_score;
                   
                    math_gradeForecast_Jsons.push(math_archive_grade); //存储成绩信息
                });
            }
        });
    }

    /*获取英语学科的7次考试排名及成绩*/
    function English_archive_beforeGrades() {
        var URL="../../../pastlessonrank?id=" + studentId + "&lesson=英语&type=classrank";
        English_gradeForecast_Jsons.splice(0,English_gradeForecast_Jsons.length);  //注意每次要将数组清空
        English_rankFrocast_Jsons.splice(0,English_rankFrocast_Jsons.length);

        var English_archive_grade;var English_archive_rank;

        $.ajax({
            url: "../../../pastlessonrank?id=" + studentId + "&lesson=英语&type=classrank",	//获取成绩及排名
            type: "GET",	//请求类型  post|get
            // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async: false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                //var stus = JSON.parse(users);
                $.each(json, function (i, n) {
                    //testName.push(parseInt(n.test_name));

                    English_archive_rank=n.rank1;
                    English_rankFrocast_Jsons.push(English_archive_rank); //存储考试排名

                    English_archive_grade=n.lesson_score;
                    English_gradeForecast_Jsons.push(English_archive_grade); //存储成绩信息
            });
            }
        });
    }





    /*按照知识点及题型分析，学生该次考试该学科的试卷得分情况*/
/*语文学科*/
function Chinese_knowleagePoint_table() {

    var URL="../../../getscorebypoint?testname="+report_testName+"&stuid="+studentId+"&lessonname=语文";
    var temp_testName;var temp_knowleagePoint;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#chinese_knowleagePoint_table  tr:not(:first)").empty("");  //清除除首行外的所有行,,语文学科按照"知识点"的成绩统计表格的生成

    chinese_grade_Jsons.splice(0,chinese_grade_Jsons.length);
    chinese_style_Jsons.splice(0,chinese_style_Jsons.length);
    $.ajax({
        url: "../../../getscorebypoint?testname="+report_testName+"&stuid="+studentId+"&lessonname=语文",//请求url
        type: "GET",
        dataType: 'json',
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
              if(n.test_name == report_testName) {  //筛选取出数据
                  temp_testName = report_testName;
                  temp_knowleagePoint = n.question_kownledge;  //取出存储"考试类型"字段的值
                  chinese_style_Jsons.push(temp_knowleagePoint);

                  temp_stuscore = n.sumget;
                  chinese_grade_Jsons.push(temp_stuscore);
                  temp_sumscore = n.fullscore;

                  $("#chinese_knowleagePoint_table").append("<tr>" +
                      "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                      + "<td style=\"text-align: center\">" + temp_knowleagePoint + "</td>"
                      + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                      + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                      + "</tr style=\"text-align: center\">");
              }
            });
        }
    });
    chinese_konowleagePoint_echarts();  //调用echarts绘制图形

}

function chinese_konowleagePoint_echarts() {  //南丁格尔玫瑰图的绘制，数据的形式要求比较高，json数组
   var list0={value:chinese_grade_Jsons[0],name:chinese_style_Jsons[0]};
    var list1={value:chinese_grade_Jsons[1],name:chinese_style_Jsons[1]};
    var list2={value:chinese_grade_Jsons[2],name:chinese_style_Jsons[2]};
    var list3={value:chinese_grade_Jsons[3],name:chinese_style_Jsons[3]};

    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chinese_knowleagePoint_chart'));
    option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            //data: ['0-1/3','1/3-2/3','2/3-满分']
        },
        series : [
            {
                name: '分数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    list0,
                    list1,
                    list2,
                    list3,
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);  //渲染区域
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function Chinese_questionType_table() {
    var temp_testName;var temp_questionStyle;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#chinese_questionType_table  tr:not(:first)").empty("");  //清除除首行外的所有行

    $.ajax({
        url: "../../../getscorebytype?testname="+report_testName+"&stuid=10000001045&lessonname=语文",//请求url
        type: "GET",
        dataType: 'json',
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                if(n.test_name == report_testName) {  //筛选取出数据
                    temp_testName = report_testName;
                    temp_questionStyle = n.title_numbertype;
                    temp_stuscore = n.sumget;
                    temp_sumscore = n.fullscore;
                    $("#chinese_questionType_table").append("<tr>" +
                        "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                        + "<td style=\"text-align: center\">" + temp_questionStyle + "</td>"
                        + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                        + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                        + "</tr style=\"text-align: center\">");
                }
            });
        }
    });

}

/*数学学科*/
function Math_knowleagePoint_table() {
    // var URL="../../../getscorebypoint?testname="+report_testName+"&stuid=10000001045&lessonname=数学";
    var temp_testName;var temp_knowleagePoint;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#math_knowleagePoint_table  tr:not(:first)").empty("");  //清除除首行外的所有行
    math_grade_Jsons.splice(0,math_grade_Jsons.length);
    math_style_Jsons.splice(0,math_style_Jsons.length);
    $.ajax({
        url: "../../../getscorebypoint?testname="+report_testName+"&stuid=10000001045&lessonname=数学",//请求url
        type: "GET",	//请求类型  post|get
        dataType: 'json',//返回数据的 类型 text|json|html--
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                if(n.test_name == report_testName) {  //筛选取出数据
                    temp_testName = report_testName;
                    temp_knowleagePoint = n.question_kownledge;
                    math_style_Jsons.push(temp_knowleagePoint);
                    temp_stuscore = n.sumget;
                    math_grade_Jsons.push(temp_stuscore);
                    temp_sumscore = n.fullscore;
                    $("#math_knowleagePoint_table").append("<tr>" +
                        "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                        + "<td style=\"text-align: center\">" + temp_knowleagePoint + "</td>"
                        + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                        + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                        + "</tr style=\"text-align: center\">");

                }
            });
        }
    });
    Math_konowleagePoint_echarts();  //调用echarts绘制图形

}

function Math_konowleagePoint_echarts() {
    var list0={value:math_grade_Jsons[0],name:math_style_Jsons[0]};
    var list1={value:math_grade_Jsons[1],name:math_style_Jsons[1]};
    var list2={value:math_grade_Jsons[2],name:math_style_Jsons[2]};
    var list3={value:math_grade_Jsons[3],name:math_style_Jsons[3]};
    var list4={value:math_grade_Jsons[4],name:math_style_Jsons[4]};

    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('math_knowleagePoint_chart'));
    option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            //data: ['0-1/3','1/3-2/3','2/3-满分']
        },
        series : [
            {
                name: '分数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    list0,
                    list1,
                    list2,
                    list3,
                    list4,
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);  //渲染区域
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function Math_questionType_table() {
    var temp_testName;var temp_questionStyle;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#math_questionType_table  tr:not(:first)").empty("");  //清除除首行外的所有行

    $.ajax({
        url: "../../../getscorebytype?testname="+report_testName+"&stuid=10000001045&lessonname=数学",//请求url
        type: "GET",	//请求类型  post|get
        // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
        dataType: 'json',//返回数据的 类型 text|json|html--
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                if(n.test_name == report_testName) {  //筛选取出数据
                    temp_testName = report_testName;
                    temp_questionStyle = n.title_numbertype;
                    temp_stuscore = n.sumget;
                    temp_sumscore = n.fullscore;
                    $("#math_questionType_table").append("<tr>" +
                        "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                        + "<td style=\"text-align: center\">" + temp_questionStyle + "</td>"
                        + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                        + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                        + "</tr style=\"text-align: center\">");
                }
            });
        }
    });

}

/*英语学科*/
function English_knowleagePoint_table() {
    var temp_testName;var temp_knowleagePoint;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#English_knowleagePoint_table  tr:not(:first)").empty("");  //清除除首行外的所有行
    $.ajax({
        url: "../../../getscorebypoint?testname="+report_testName+"&stuid=10000001045&lessonname=英语",//请求url
        type: "GET",
        dataType: 'json',
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                if(n.test_name == report_testName) {  //筛选取出数据
                    temp_testName = report_testName;
                    temp_knowleagePoint = n.question_kownledge;
                    temp_stuscore = n.sumget;
                    temp_sumscore = n.fullscore;
                    $("#English_knowleagePoint_table").append("<tr>" +
                        "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                        + "<td style=\"text-align: center\">" + temp_knowleagePoint + "</td>"
                        + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                        + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                        + "</tr style=\"text-align: center\">");
                }

            });
        }
    });


}

function English_questionType_table() {
    var temp_testName;var temp_questionStyle;var temp_stuscore;var temp_sumscore; //存储从服务器返回的考试名称、知识点、学生得分、总分
    $("#English_questionType_table  tr:not(:first)").empty("");  //清除除首行外的所有行
    English_grade_Jsons.splice(0,English_grade_Jsons.length);
    English_style_Jsons.splice(0,English_style_Jsons.length);

    $.ajax({
        url: "../../../getscorebytype?testname="+report_testName+"&stuid=10000001045&lessonname=英语",//请求url
        type: "GET",
        dataType: 'json',
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {
                if(n.test_name == report_testName) {  //筛选取出数据
                    temp_testName = report_testName;
                    temp_questionStyle = n.title_numbertype;
                    English_style_Jsons.push(temp_questionStyle);

                    temp_stuscore = n.sumget;
                    English_grade_Jsons.push(temp_stuscore);
                    temp_sumscore = n.fullscore;
                    $("#English_questionType_table").append("<tr>" +
                        "<td  style=\"text-align: center\">" + temp_testName + "</td>"
                        + "<td style=\"text-align: center\">" + temp_questionStyle + "</td>"
                        + "<td style=\"text-align: center\">" + temp_stuscore + "</td>"
                        + "<td style=\"text-align: center\">" + temp_sumscore + "</td>"
                        + "</tr style=\"text-align: center\">");
                }
            });
        }
    });

    English_questionType_echarts();  //调用echarts绘制图形

}

function English_questionType_echarts() {
    var list0={value:English_grade_Jsons[0],name:English_style_Jsons[0]};
    var list1={value:English_grade_Jsons[1],name:English_style_Jsons[1]};
    var list2={value:English_grade_Jsons[2],name:English_style_Jsons[2]};

    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('English_questionType_chart'));
    option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            //data: ['0-1/3','1/3-2/3','2/3-满分']
        },
        series : [
            {
                name: '分数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    list0,
                    list1,
                    list2,
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);  //渲染区域
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}



