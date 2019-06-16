
/*此js文件用于实现登陆的后台逻辑功能，，，更改密码功能在管理界面中实现*/
var login_Name="";   //声明为全局变量
var login_Password="";

//登陆提交按钮的点击事件
function  LoginFunction() {
    /*console.log("LoginFunction start");
    login_Name=$("#login_Name").val();  //登陆名称,,,取出input元素中的值
    login_Password=$("#login_Password").val();  //登陆密码
    console.log(login_Name+" "+login_Password);
    if(login_Name!=null && login_Password!=null){
         window.location.href = 'index_teacher.html'; //页面跳转到index主界面
    }*/
    window.location.href = '../index_teacher.html'; //页面跳转到index主界面
}