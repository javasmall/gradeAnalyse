
var classId="";
var studentId="";
/*成绩分析,某次考试某一科目的成绩分析*/
var singleSub_test="test1";
var singleSub_subject="语文";

layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;
    form.on('select(testSelect)', function (data) {
        //alert(data.value);
        singleSub_test=data.value;
        singleSub_getJson();  //下拉框中的值发生变化，则刷新echarts
    });
});

layui.use(['layer', 'form'], function () {
    var layer = layui.layer;
    var form = layui.form;

    form.on('select(subjectSelect)', function (data) {
        singleSub_subject=data.value;
        singleSub_getJson();
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
            $.ajax({
            // /ssm/getproblemscorebystuid?lesson=语文&studentid=&testname=
                url: "../../../getproblemscorebystuid?lesson=" +singleSub_subject+ "&studentid="+studentId+"&testname="+singleSub_test,	//请求url
                type: "GET",
                dataType: 'json',
                crossDomain: true,
                async:false,  //必须是同步，因为处在for循环中
                success: function (json) {	//回调函数 和 后台返回的 数据
                    $.each(json, function (i, n) {
                            var question="第"+n.question_index+"题";
                            var temp={value:n.score, name:question};
                            singleSub_jsons.push(temp);
                    });
                }
            });
        }
    getJson();

    var myChart = echarts.init(document.getElementById('singleSub_chart'));
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
                radius : [40, 180],
                center : ['50%', '50%'], //图表的中心位于容器的相对位置
                roseType : 'area',        //面积模式
                itemStyle : {
                    normal: {
                        label: {                 //指示到模块的标签文字
                            show: true,
                            color:'black',
                            textStyle:{
                                color:'#000',
                                fontSize:18,
                                fontWeight:'700'
                            }
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