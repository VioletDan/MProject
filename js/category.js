var count=0;
//请求商品列表
$.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getcategorytitle',
    success:function(data){
        //console.log(data);
        var tplStr1=template('tpl1',data);
        $('.row>.category-title').append(tplStr1);
        //先让li隐藏
        $('.row .category-content').hide();
        //设置一个变量
        var count=0;
        $('.row>.category-title >li>a').click(function(){
            var titleid=$(this).data('title-id');
            count++;
            if(count%2!=0){
                $('.row .category-content').eq(titleid).show();
            }else{
                 $('.row .category-content').hide();
                 count=0;
            }   
            //count=$(this).index();
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:9090/api/getcategory',
                data:{
                    titleid:titleid
                },
                success:function(data){
                    var tplStr2=template('tpl2',data);
                    $('.row .category-content').eq(titleid).empty().append(tplStr2);
                },
                erro:function(){
                    console.log('请求出错');
                }
            })
        })
        
    },
    erro:function(){
        console.log('请求出错');
    }
});
//用a标签的id向后台再发送一次数据
