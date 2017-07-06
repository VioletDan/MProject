getBaicaijiatitle();
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
// var titleid=href.titleid;
function getBaicaijiatitle(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbaicaijiatitle',
        success:function(data){
            // console.log(data);
            var tplStr1=template('tpl1',data);
            $('.tabs').append(tplStr1);
            $('#wapper>ul>li').eq(0).addClass('active');
            getBaicaijiaproduct(0);
            //bug:要循环遍历li标签,循环添加点击事件
            //顶部滑动事件
            (function(){
                //1.顶部滑动设计
                var myScroll;
                function loaded () {
                    myScroll = new IScroll('#wapper', { 
                        scrollX: true,   // 横向
                        scrollY: false   // 纵向
                    });
                }
                /*  
                myScroll 初始化函数, myScroll 初始化函数
                注意：初始化函数，必须完全能确定 选定元素 和 其子元素 宽高时，执行才有效
                比如：ajax动态渲染的结构，loaded就要放在结构渲染完再执行
                */
                // 计算宽度 进行 ul 宽度初始化
                var width = 0;
                $('#wapper>ul>li').each(function( index, item ) {
                    // width()方法用于获得元素宽度；
                    // innerWidth()方法用于获得包括内边界（padding）的元素宽度
                    // outerWidth()方法用于获得包括内边界(padding)和边框(border)的元素宽度
                    width += $( item ).innerWidth();
                });
                // 加上右侧搜索框的宽度,不加的话最后一个会被盖住
                width += $('.searchbtn').innerWidth();
                // 最后设置给ul
                $('#wapper>ul').width(width);

                // 初始化完ul宽度后，进行wapper初始化
                loaded();
                //2.绑定点击事件，点击时切换样式，并让被选中的元素跑到第一个去
                $('#wapper').on('click', 'li', function() {
                    // 排他切换样式
                    $(this).addClass('active').siblings().removeClass('active');
                    // 让其第一个显示
                    // 滚动到哪一个元素
                    myScroll.scrollToElement($(this)[0]);
                    getBaicaijiaproduct($(this).index()); 
                });
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
                    },100);
                })
            })()
        },
        error:function(){
            console.log("请求出错");
        }
    });
}
function getBaicaijiaproduct(titleid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
        data:{
            titleid:titleid
        },
        success:function(data){
            // console.log(data);
            var tplStr2=template('tpl2',data);
            $('.bcj-list>ul').empty().append(tplStr2);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}






