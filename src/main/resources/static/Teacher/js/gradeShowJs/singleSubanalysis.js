//console.log("js been disposed");
var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var studentId=10000000141;
/*成绩分析,某次考试某一科目的成绩分析*/
var singleSub_test="test1";
var singleSub_subject="数学";

//监听下拉框值变化事件，注意layui中不能使用js中的onChange进行监听，使用form.on方法加过滤器
layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form();
   
    //监听表单中的考试名称
    form.on('select(testSelect)', function (data) {
        //alert(data.value);
        singleSub_test=data.value;
        singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form();
    
    //监听表单中的考试科目
    form.on('select(subjectSelect)', function (data) {
        //alert(data.value);
        singleSub_subject=data.value;
        singleSub_getJson();
    });
});

$(function () {
    singleSub_getJson();
})

function singleSub_getJson(){  //echart_5()
    // 基于准备好的dom，初始化echarts实例
    var singleSub_scoreList=new Array();
    var singleSub_jsons=[];
   
    //每次刷新echarts时首先清空数组
    //echart2_scoreList.splice(0,echart2_scoreList.length);
    if(singleSub_subject=="语文"){//每次考试下该科目的成绩,定义不同大小的scoreList存储某次考试下某一科目试卷的每道题得分情况
        singleSub_scoreList= new Array(17);
    }else if(singleSub_subject=="数学"){   //数学20题
        singleSub_scoreList= new Array(20);
    }else if(singleSub_subject=="英语"){  ///英语26题
        singleSub_scoreList= new Array(26);
    }
    singleSub_jsons.splice(0,singleSub_jsons.length);
    function getJson() {
        
        for(var j=1;j<=singleSub_scoreList.length;j++) { //获取所有考试的三科总成绩
            //../../../getproblemscore?lesson=英语&classid=100000009&index=26&test=test1
            var URL="../../../getproblemscore?lesson=" +singleSub_subject+ "&classid="+classId+"&index="+j+"&test="+singleSub_test;
            
            $.ajax({
                url: "../../../getproblemscore?lesson=" +singleSub_subject+ "&classid="+classId+"&index="+j+"&test="+singleSub_test,	//请求url
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
                        if(n.student_id==studentId) {
                           
                            var question="第"+j+"题";
                            
                            var temp={value:n.score, name:question};
                            singleSub_jsons.push(temp);
                            // sumscoreList.push((n.sumscore));   //三科总成绩
                            //sumscoreList[i]=n.sumscore;
                            //   stuList.push(parseInt(n.student_id) - 10000000000); //学号三两位
                        }

                    });
//}
                }
            });
            //.done(sumscoreList[i]=temp);   //ajax执行完成后的回调函数
        }
    }
    getJson();

    var myChart = echarts.init(document.getElementById('singleSub_chart'));
    /*var list1={value:15, name:'rose3'};var list2={value:45, name:'rose4'};
    var list={list1,list2};*/
    myChart.setOption({
        //标题
        title : {
            // text: '南丁格尔玫瑰图',
            // subtext: '纯属虚构',
            x:'center'         //标题的位置
        },
        tooltip : {
            trigger: 'item',
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例的位置与名称
        /*legend: {
            x : 'center',
            y : 'bottom',
            data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
        },*/
        //右上角工具栏
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                // restore : {show: true},
                // saveAsImage : {show: true}
            }
        },
        // calculable : true,
        graphic:{            //echarts饼图中间放字
            type:'text',
            left:'center',
            top:'center',
            z:2,
            //  zlevel:10,
            style:{
                text:'试卷',
                textAlign:'center',
                fill:'#000',
                font:' 22px 微软雅黑 '
            },
        },
        series : [
            {
                name:'得分',
                type:'pie',
                radius : [40, 120],
                center : ['50%', '50%'], //图表的中心位于容器的相对位置
                roseType : 'area',        //面积模式
                itemStyle : {
                    normal: {
                        label: {                 //指示到模块的标签文字
                            show: true,
                            color:'black',
                            // formatter: '{b} : {c} \n ({d}%)'
                        },
                        labelLine: {             //指示到模块的标签线
                            show: true,

                        }
                    },
                },
                color: ['#393939','#f5b031','#fad797','#59ccf7','#c3b4df','red','blue','pink'], //颜色将根据饼图的区域个数循环
                data:singleSub_jsons,
                //[
                //此处可以直接放置list数组，list数组是json数组
                /*{value:10, name:'第1题'},  //数组中有两个要素
                {value:5, name:'第2题'},
                {value:15, name:'第3题'},
                {value:25, name:'第4题'},
                {value:20, name:'第5题'},
                {value:35, name:'第6题'},
                {value:30, name:'第7题'},
                {value:40, name:'第8题'}*/
                //],

            }
        ]
    });
}