//3.底部小火箭
var timer=null;
var leader=0;
//3.1页面滑动到一定的距离时,显示小火箭
$('#gotop').hide();
$(window).scroll(function(){
    if($(this).scrollTop()>1000){
        $('#gotop').show();
    }else{
        $('#gotop').hide();
    }
    leader=$(this).scrollTop();
    //console.log(leader);
})
//这块可以封装成对象
//3.2点击箭头,页面缓动滑到最顶端
$('#gotop').click(function(){
    //$(window).scrollTop(0,0);//瞬间滑动到最顶端,用户体验不好
    clearInterval(timer);
    timer = setInterval(function () {
        //1.获取步长;
        var step = (0 - leader)/10;
        //2.二次处理
        step = step > 0?Math.ceil(step):Math.floor(step);
        //3.赋值;
        leader = leader + step;
        $(window).scrollTop(0,leader);
        //4.清除定时器;
        if(leader === 0){
            clearInterval(timer);
            alert("已经到达页面顶端了哦");
        }
    },200);
})

//地址讲解
function subStr(url) {
    var obj = {};
    var str = url.split('?')[1];
    //console.log(str);//categoryid=0
    var str2 = str.split('&');
    //console.log(str2);// ["categoryid=0"]是一个对象
    for (var k in str2) {
        var str3 = str2[k].split('=');
        obj[str3[0]] = str3[1];
    }
    return obj;
}
// var href = subStr(window.location.href);
//登录框
