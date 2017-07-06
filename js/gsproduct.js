// 总结:解决一个bug解决了半天,最后竟然是模板没清空......我是一个傻子,以此警示自己!!!!
getGsshop();
getGsshoparea();
var shopid=0;
var areaid=0;
//请求jd店铺 
function getGsshop(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getgsshop',
        success:function(data){
            //console.log(data);
            var tplStr1=template('tpl1',data);
            $('.popsort>ul').append(tplStr1);
            getGsproduct(shopid,areaid);
            //遍历店铺li标签添加点击事件
            $('#shop>ul>li').click(function(){
                $(this).toggleClass('on').siblings('li').removeClass('on');
                $('#shop').removeClass('on');
                shopid=$(this).children(0).data('shopid');
                $('.filter>ul>li').eq(0).html('<a href="javascript:;" class="shop" data-id='+shopid+'>'+$(this).children(0).html().substring(0,4)+'<i></i></a>');
                getGsproduct(shopid,areaid);
            }); 
        },
        error:function(){
            console.log('请求出错');
        }
    })
}
//请求地址
function getGsshoparea(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getgsshoparea',
        success:function(data){
            //console.log(data);
            var tplStr2=template('tpl2',data);
            $('.popcar>ul').append(tplStr2);            
                getGsproduct()                
                //遍历店铺li标签添加点击事件
                $('#area>ul>li').click(function(){
                    $(this).toggleClass('on').siblings('li').removeClass('on');
                    $('#area ').removeClass('on');
                    areaid=$(this).children(0).data('areaid');
                    $('.filter>ul>li').eq(1).html('<a href="javascript:;" class="area" data-id='+areaid+'>'+$(this).children(0).html().substring(0,2)+'<i></i></a>');
                    getGsproduct(shopid,areaid);
                });
        
        },
        error:function(){
            console.log('请求出错');
        }
    })
}
//请求商品列表
function getGsproduct(shopid,areaid ){
    //console.log(shopid,areaid);
   $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getgsproduct',
        data:{
            shopid:shopid||0,
            areaid:areaid||0
        },
        success:function(data){
            //console.log(data);
            var tplStr3=template('tpl3',data);
            $('#container').html(tplStr3);
        },
        error:function(){
            console.log('请求出错');
        }
    }) 
}

//标题点击事件
$('.filter>ul>li').eq(0).click(function(){
    $('#shop').toggleClass('on');    
});
$('.filter>ul>li').eq(1).click(function(){
    $('#area').toggleClass('on');
})
$('.filter>ul>li').eq(2).click(function(){
     $('#price').toggleClass('on');
});
