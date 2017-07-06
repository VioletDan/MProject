var href = subStr(window.location.href);
//console.log(href.brandtitleid);
var pagesize=4;
var brandtitleid=href.brandtitleid;
getBrand(brandtitleid);
getBrandproductlist(brandtitleid,pagesize);
//十大品牌
function getBrand(brandtitleid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbrand',
        data:{
            brandtitleid:brandtitleid
        },
        success:function(data){
            //console.log(data);
            var tplStr1=template('tpl1',data);
            $('.row>ul').append(tplStr1);
            //em的值
            alert('谁给的钱多谁第一');
            var contents=[];
            var numberArr=[];
            var emName=['top1','top2','top3'];
            $('.row>ul>li').each(function(index,value){
                $(this).find('em').html(index+1);
                if(index<3){
                    $(this).find('em').addClass(emName[index]);
                }
                var number=$(this).find('p').html().slice(8,14);
                var content=$(this).find('.tit').html();
                contents.push(content);
                numberArr.push(number);
                for (var i = 0; i < numberArr.length-1; i++) {
                    for(var j=0;j<numberArr.length-i;j++){
                        var temp=0;
                        if(numberArr[i+1]>numberArr[i]){
                            temp=numberArr[i];
                            numberArr[i]=numberArr[i+1];
                            numberArr[i+1]=temp;
                        }
                    }
                }
                
            });
            //排序未完成
            //bug未解决
            //console.log(contents);
            //console.log(numberArr);
            numberArr.forEach(function(value,index) {
                $('.row>ul>li').eq(index).find('.tit').html(contents[index]);
                $('.row>ul>li').eq(index).find('p').html('30天全网销售：'+value); 
            }, this);
            
        },
        error:function(){
            console.log('请求出错');
        }
    })
}
//销量排行商品列表
function getBrandproductlist(brandtitleid,pagesize ){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbrandproductlist',
        data:{
            brandtitleid:brandtitleid,
            pagesize:pagesize
        },
        success:function(data){
            //console.log(data);
            var tplStr2=template('tpl2',data);
            $('.product-list>ul').append(tplStr2);
            //获取productid
            $('.product-list>ul>li').each(function(index,value){
                var productid=$(this).children(0).data('productid');
                getProductcom(productid);
            })
        },
        error:function(){
            console.log('请求出错');
        }
    })
}
//获取评论
function getProductcom(productid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getproductcom',
        data:{
            productid:productid
        },
        success:function(data){
            //console.log(data);
            var tplStr3=template('tpl3',data);
            $('.pllist>ul').empty().append(tplStr3);
        },
        error:function(){
            console.log('请求出错');
        }
    })
}