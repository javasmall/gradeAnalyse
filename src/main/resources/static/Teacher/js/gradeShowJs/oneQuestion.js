
var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;
var oneQuestion_test="test1";  //之后用于拼接地址
var oneQuestion_subject="语文";
var oneQuestion_questionNumber="1";

//table与echarts共用数据
var temp_oneQuestion_sumScore="";var temp_oneQuestion_stus1="";var temp_oneQuestion_stus2="";var temp_oneQuestion_stus3="";
var oneQuestion_stuJson1=new Array();
var oneQuestion_stuJson2=new Array();
var oneQuestion_stuJson3=new Array();

/*科目选定后，查询按钮的点击事件,用于显示数据*/
function searchUrl(){   //点击搜索按钮，判断两个下拉框的状态进行选择调用不同的函数(向服务器请求数据)
    //alert("search been clicked!");
    oneQuestion_getsumofPerson_table();
    oneQuestion_getsumofPerson_echarts();
    //通过判断两个下拉框中的值，调用不同方法
    //oneSubjectTrend_getTrend_table();
    //oneSubjectTrend_getTrend_echarts();
}

//选择要查询的考试
layui.use(['layer', 'form'], function () {
    //每次选择列表中的值，都会调用该函数，完成对地址拼接中参数的赋值，以及表单隐藏元素，，并且调用upload_getJson()获取当前题目的知识点
    var layer = layui.layer;
    var form = layui.form;
    //监听表单中的考试名称
    form.on('select(testSelect)', function (data) {
        //alert(data.value);
        oneQuestion_test=data.value;
        //singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

layui.use(['layer', 'form'], function () { //下拉框选择科目
    var layer = layui.layer;
    var form = layui.form;
    form.on('select(subjectSelect)', function (data) {
       // alert(data.value);
        oneQuestion_subject=data.value;
        addQuestionNumberItem(); //调用函数，记载题号，根据选中的不同科目加载题号
        //oneSubjectTrend_subject=data.value;
        //oneSubjectTrend_getTrend(); //下拉框中的值发生变化，则刷新echarts
    });
});

//选择错题的题号
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    form.on('select(qtnumberSelect)', function (data) {
        //alert(data.value);
        oneQuestion_questionNumber=data.value;
        // upload_questionNumber=data.value;
        //singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

    /*初始化加载函数*/
    $(function () {
        $("#qtnumberSelect").empty();
        addQuestionNumberItem();
        renderForm();
        oneQuestion_getsumofPerson_table();
        oneQuestion_getsumofPerson_echarts();
    });

    /*刷新表单函数*/
    function renderForm(){  //表单重新渲染方法，不然下拉框中添加的新的option子项加载出来
        layui.use('form', function(){
            var form = layui.form;
            form.render();
        });
    }
    /*不同学科加载题号函数*/
    function addQuestionNumberItem() {
		
        if(oneQuestion_subject=="语文"){ //语文17道题目
            $("#qtnumberSelect").empty();  //下拉框中的值更新之前必须清空
            $("#qtnumberSelect").append("<option value=''>--题号--</option>");
            renderForm();
            for(var i=1;i<=17;i++){
                var j=i+"";
                $("#qtnumberSelect").append("<option value=" +j+ ">" +j+ "</option>");
            }
            renderForm();
        }else if(oneQuestion_subject=="数学"){ //20道题目
            $("#qtnumberSelect").empty();  //下拉框中的值更新之前必须清空
            
            $("#qtnumberSelect").append("<option value=''>--题号--</option>");
            renderForm();
            for(var i=1;i<=20;i++){
                var j=i+"";
                $("#qtnumberSelect").append("<option value=" +j+ ">" +j+ "</option>");
            }
            renderForm();

        }else if(oneQuestion_subject="英语"){  //26道题目
            $("#qtnumberSelect").empty();  //下拉框中的值更新之前必须清空
            $("#qtnumberSelect").append("<option value=''>--题号--</option>");
            renderForm();
            for(var i=1;i<=26;i++){
                var j=i+"";
                $("#qtnumberSelect").append("<option value=" +j+ ">" +j+ "</option>");
            }
            renderForm();
        }

    }

    /*逻辑代码，实现某次考试某一科目中某道题的得分情况,主要是分析得分人数,,表格显示*/
    function oneQuestion_getsumofPerson_table() {
        var URL="../../../getproblemscore?lesson=语文&classid=100000009&index=17&test=test1";
        var testURL="../../../getproblemscore?lesson="+oneQuestion_subject+"&classid="+classId+"&index="+oneQuestion_questionNumber
            +"&test="+oneQuestion_test;
        
        temp_oneQuestion_sumScore="";temp_oneQuestion_stus1="";temp_oneQuestion_stus2="";temp_oneQuestion_stus3="";
        oneQuestion_stuJson1.splice(0,oneQuestion_stuJson1.length);oneQuestion_stuJson2.splice(0,oneQuestion_stuJson2.length);
        oneQuestion_stuJson3.splice(0,oneQuestion_stuJson3.length);
        //存储从服务器返回的该题总分，各得分区间的人数统计
        
        $("#oneQuestion_table  tr:not(:first)").empty("");  //清除除首行外的所有行

        $.ajax({
            url: "../../../getproblemscore?lesson="+oneQuestion_subject+"&classid="+classId+"&index="+oneQuestion_questionNumber
            +"&test="+oneQuestion_test,//请求url
            type: "GET",	//请求类型  post|get
            // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
            dataType: 'json',//返回数据的 类型 text|json|html--
            crossDomain: true,
            async:false,
            success: function (json) {	//回调函数 和 后台返回的 数据
                $.each(json, function (i, n) {
                    temp_oneQuestion_sumScore=n.fullscore;//该道题目的总得分

                    if(n.score<=temp_oneQuestion_sumScore/3)
                    {
                        oneQuestion_stuJson1.push((n.student_id+"").substring(8));  //学号后三位存入数组
                    }else if(temp_oneQuestion_sumScore/3<n.score && n.score<=temp_oneQuestion_sumScore*2/3)
                    {
                        oneQuestion_stuJson2.push((n.student_id+"").substring(8));
                    }else if(temp_oneQuestion_sumScore*2/3<n.score<=temp_oneQuestion_sumScore){
                        oneQuestion_stuJson3.push((n.student_id+"").substring(8));
                    }
                    // renderForm();  //重新渲染表单
                });
            }
        });
        
        //数据通过测试，正确
        for(var i=0;i<oneQuestion_stuJson1.length;i++){
            temp_oneQuestion_stus1 += oneQuestion_stuJson1[i] + " ";  //如果temp_oneQuestion_stus1未初始化，将显示undentified
        }
        
        for(var i=0;i<oneQuestion_stuJson2.length;i++){
          
            temp_oneQuestion_stus2 += oneQuestion_stuJson2[i] + " ";
        }
        
        for(var i=0;i<oneQuestion_stuJson3.length;i++){
            
            temp_oneQuestion_stus3 += oneQuestion_stuJson3[i] + " ";
        }


        $("#oneQuestion_table").append("<tr>" +
            "<td  style=\"text-align: center\">" +  oneQuestion_stuJson1.length +"</td>"
            +"<td style=\"text-align: center\">" +  temp_oneQuestion_stus1 +"</td>"
            +"<td style=\"text-align: center\">" +  oneQuestion_stuJson2.length +"</td>"
            +"<td style=\"text-align: center\">" +  temp_oneQuestion_stus2 +"</td>"
            +"<td style=\"text-align: center\">" +  oneQuestion_stuJson3.length +"</td>"
            +"<td style=\"text-align: center\">" +  temp_oneQuestion_stus3 +"</td>"
            + "</tr style=\"text-align: center\">");
    }
    /*使用饼状图显示，就该题目而言显示各分数段的人数*/
    function oneQuestion_getsumofPerson_echarts() { //由以上的表提供数据

        oneQuestion_getsumofPerson_table();  //获得数据

        //基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('oneQuestion_chart'));
        option = {

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['0-1/3','1/3-2/3','2/3-满分']
            },
            series : [
                {
                    name: '人数',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:oneQuestion_stuJson1.length, name:'0-1/3'},
                        {value:oneQuestion_stuJson2.length, name:'1/3-2/3'},
                        {value:oneQuestion_stuJson3.length, name:'2/3-满分'},
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
