
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var studentId="";
var allSubpt_test="test1";
//监听下拉框值变化事件，注意layui中不能使用js中的onChange进行监听，使用form.on方法加过滤器
layui.use(['layer', 'form'], function () {
    // var layer = layui.layer;
    // var form = layui.form;
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;
    //console.log("form is: "+form);
    //监听表单中的考试名称
    form.on('select(testSelect)', function (data) {
        //alert(data.value);
        allSubpt_test=data.value;
        allSubpt_getJson(); //下拉框中的值发生变化，则刷新echarts
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
    //console.log("clssId is: "+studentId.toString().substring(0,9));
    allSubpt_getJson();
});

function allSubpt_getJson(){
    // var testName=['test1','test2','test3','test4','test5','test6','test7'];  //考试名称下拉框获取
    var subJectName=['语文','数学','英语','物理','化学'];
    var scoreList= new Array(5);  //每次考试5科成绩
    function getJson() {
            var URL="../../../classlessonscore?test=" +allSubpt_test+ "&stuid="+studentId;

            $.ajax({
                url: "../../../classlessonscore?test=" +allSubpt_test+ "&stuid="+studentId,	//请求url
                type: "GET",	//请求类型  post|get
                dataType: 'json',//返回数据的 类型 text|json|html--
                crossDomain: true,
                async:false,
                success: function (json) {	//回调函数 和 后台返回的 数据

                    $.each(json, function (i, n) {
                        if(n.lesson=="语文") {
                            scoreList[0]=n.score;
                        }else if(n.lesson=="数学") {
                            scoreList[1]=n.score;
                        }else if(n.lesson=="英语") {
                            scoreList[2]=n.score;
                        }else if(n.lesson=="物理") {
                            scoreList[3]=n.score;
                        }else if(n.lesson=="化学") {
                            scoreList[4]=n.score;
                        }

                    });
                }
            })
    }


    getJson();
    // 基于准备好的dom，初始化echarts实例
    //  var myChart = echarts.init(document.getElementById('chart_3'));

    var myChart = echarts.init(document.getElementById("allsubpt_chart"));
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
                data : subJectName,
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

                }
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
                                fontSize: 18
                            }
                        }
                    }
                },
                data:scoreList,
            }
        ]
    };
    myChart.setOption(option);
    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}