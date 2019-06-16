
var brower_height=0;
var real_height=0;
var iframe_height="";
$(function () {
    brower_height=window.outerHeight;
    real_height=brower_height-235;

    $("#iframe_parent").height(real_height);
    //console.log("height: "+real_height );

    iframe_height="height:"+real_height+"px" ;
})

//JavaScript代码区域
layui.use('element', function(){
    var element = layui.element;
    var $ = layui.jquery;
    //触发事件
    var active = {
        //在这里给active绑定几项事件，后面可通过active调用这些事件
        tabAdd: function(url,id,name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
            element.tabAdd('tabdemo', {
                title: name,
                content: ' <iframe style="'+iframe_height+'" class="larry-iframe" data-frameid="'+id+'"  frameborder="0" src="'+url+'"></iframe> ',
                id: id //规定好的id
            })
            element.render('tab');
        },

        tabChange: function(id) {
            //切换到指定Tab项
            element.tabChange('tabdemo', id); //根据传入的id传入到指定的tab项
        },

        tabDelete: function (id) {
            element.tabDelete("tabdemo", id);//删除
        }
        , tabDeleteAll: function (ids) {//删除所有
            $.each(ids, function (i,item) {
                element.tabDelete("tabdemo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
            })
        }
    };


    //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
    $('.site-demo-active').on('click', function() {
        var dataid = $(this);

        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
        if ($(".layui-tab-title li[lay-id]").length <= 0) {
            //如果比零小，则直接打开新的tab项
            active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
        } else {
            //否则判断该tab项是否以及存在

            var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
            $.each($(".layui-tab-title li[lay-id]"), function () {
                //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                    isData = true;
                }
            })
            if (isData == false) {
                //标志为false 新增一个tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
            }
        }
        //最后不管是否新增tab，最后都转到要打开的选项页面上
        active.tabChange(dataid.attr("data-id"));
    });

});