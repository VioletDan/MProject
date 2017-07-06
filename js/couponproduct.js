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
var href = subStr(window.location.href);
var couponid=href.couponid;
getCouponproduct(couponid);
function getCouponproduct(couponid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getcouponproduct',
        data:{
            couponid:couponid
        },
        success:function(data){
            //console.log(data);
            var tplStr1=template('tpl1',data);
            $('.coupon-list>ul').append(tplStr1);
            //点击每一个a链接的时候,切换优惠券未实现
            //获取所有的pic.总共58.li是0到56 index也要是0到56 所以减2
            var pics=$('.pic');
            var maxIndex=pics.length-2;
            var pics=$('.coupon-list>ul>li').find('pic');
            $('.coupon-list>ul>li').click(function(){
                var img=$(this).find('.pic').html();
                $('.mmb-modal .pic').html(img);             
                $('.mmb-modal').show();
                $('.mmb-modal .pic').attr('data-index',$(this).attr('data-couponProductid'))
                // 点击轮播图
                //显示下一张
                $('.mmb-modal .r').click(function(){
                    showNext();
                });
                function showNext(){
                    var index=$('.mmb-modal .pic').attr('data-index');
                    if(index==maxIndex){
                        index=0;
                    }else{
                        index++;
                    }
                    $('.mmb-modal .pic').html($('.coupon-list>ul>li').eq(index).find('.pic').html());
                    $('.coupon-list>ul>li').eq(index).find('.pic').html()
                    $('.mmb-modal .pic').attr('data-index',index);
                }
                //显示上一张
                $('.mmb-modal .l').click(function(){
                   showPre();
                });
                function showPre(){
                    var index=$('.mmb-modal .pic').attr('data-index');
                    if(index==0){
                        index=maxIndex;
                    }else{
                        index--;
                    }
                    $('.mmb-modal .pic').html($('.coupon-list>ul>li').eq(index).find('.pic').html());
                    $('.coupon-list>ul>li').eq(index).find('.pic').html()
                    $('.mmb-modal .pic').attr('data-index',index);
                }
                //隐藏遮罩层
                $('.cannel').click(function(){
                    $('.mmb-modal').hide();
                });
            })
            
        },
        error:function(){
            console.log('请求出错');
        }
    })
}