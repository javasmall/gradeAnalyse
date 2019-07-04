
//var classId=100000001; //当点击index.html中的详细页面时，显示详细页面,通过index.html把值传过来
var classId="";
//var studentId=10000000141;
var studentId="";
/*学生查看自己上传记录的后台js文件*/

    $(function () {   //初始化函数
        //学生登陆后，通过"账户"检索"学生学号",,将"学号"存储在Cookie中
        if($.cookie('studentId')!=null){   //进行判空操作
            studentId=$.cookie('studentId');
            classId=studentId.toString().substring(0,9);
        }else {
            studentId=10000000141;
            classId=100000001;
        }
        upload_wrongpic_info();  //加载图片上传列表
    });

//以往上传题目的信息，，，先用固定的一些数据，占据可视区域
function upload_wrongpic_info() {
    var upload_ImgList=new Array();
    var URL="../../../geterrorcollection?school=just&id="+studentId;
    upload_ImgList.splice(0,upload_ImgList.length); //清空数组
    var upload_testName; var upload_lesson;var upload_knowleagPoint;var upload_problemId;var upload_uploadTime;var upload_imageurl;//存储从服务器返回的考试名称、课程、知识点、题号、上传时间、图片url
    $("#allgrade_table  tr:not(:first)").empty("");  //清除除首行外的所有行

    $.ajax({
        url: "../../../geterrorcollection?school=just&id="+studentId,//请求url
        type: "GET",	//请求类型  post|get
        // data : "key=value&key1=value2",	//后台用 request.getParameter("key");
        dataType: 'json',//返回数据的 类型 text|json|html--
        crossDomain: true,
        async:false,
        success: function (json) {	//回调函数 和 后台返回的 数据
            $.each(json, function (i, n) {  //filmDetail_method(this)
                upload_testName=n.test_name;
                upload_lesson=n.lesson_name;
                upload_knowleagPoint=n.kownledge_point;
                upload_problemId=n.problem_id;
                upload_uploadTime=n.uploadtime;
                upload_imageurl=n.img_url;
                $("#allgrade_table").append("<tr>" +
                    //"<td><input type=\"checkbox\"></td>"
                    "<td  style=\"text-align: center\">" +  upload_testName +"</td>"
                    +"<td style=\"text-align: center\">" +  upload_lesson +"</td>"
                    +"<td style=\"text-align: center\">" +  upload_knowleagPoint +"</td>"
                    +"<td style=\"text-align: center\">" +  upload_problemId +"</td>"
                    +"<td style=\"text-align: center\">" +   upload_uploadTime +"</td>"
                    +"<td style=\"text-align: center;display: none\">" +   upload_imageurl +"</td>"
                    +"<td style=\"text-align: center\">" +
                    "<button class=\"layui-btn layui-btn-primary layui-btn-xs\"  onclick=\"question_show_showDetails()\">查看</button>"+
                    "<button class=\"layui-btn layui-btn-danger layui-btn-xs\"  onclick=\"question_show_Delete(this)\">删除</button>"
                    +"</td>"
                    + "</tr style=\"text-align: center\">");
                //style="display: none"
                //要为每行中的"删除"按钮，增加点击事件，能够删除该图片,,表格中已经获取图片url，只是没有进行显示

            });

        }
    });
}



    /*为表格中的"行元素"中的"删除按钮"点击事件*/
    function question_show_Delete(target) {
        var delete_img_head="../../../delete?imgurl=";   //再后面拼接要删除的图片的url,,然后向服务器发送请求即可删除
        var delete_imgUrl=$(target).parent().parent().find("td").eq(5).html();   //获取到要删除的图片的url
        var temp=delete_img_head+delete_imgUrl;
        layer.confirm('确认删除本条记录及错题图片吗?', { btn: ['是','否'],
            btn1: function(){
                //通过btn1的函数就可与服务器交互完成删除
            $.ajax({
                    url: "../../../delete?imgurl="+delete_imgUrl,
                    type: "GET",
                    // data:{"id":temp},
                     data:" ",
                    success:function () {
                        //layer.msg("删除成功");//successfully delete!
                        layer.closeAll('dialog');
                        //alert("删除成功!");  //删除操作完成后，重新加载记录表格
                        layer.msg("删除成功");
                        upload_wrongpic_info();

                    },
                    error:function () {
                        layer.closeAll('dialog');
                           //alert("删除成功!");   //虽然没有调用success函数，但是依然删除成功
                        layer.msg("删除成功");
                            upload_wrongpic_info();
                        },
                })
            },
            btn2: function(){
                alert("取消删除成功!");
            }
        });


        //注意错题图片删除后，重新加载表格

        //console.log("target text is: "+$(target).text());
        //console.log("target parent is: "+$(target).parent().parent().find("td").eq(5).html());  //删除按钮对应的行中的图片信息
        //$(target).parent()上一层父元素是td，再上一层就是tr,即两次parent()找到了"删除"按钮所在的行

    }
    
