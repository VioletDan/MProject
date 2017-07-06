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
var productid=href.productid;
getTitle(productid);
getProduct(productid);
getProductcom(productid);
//获取导航栏内容
function getTitle(productid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        data:{
            categoryid:productid
        },
        success:function(data){
            //console.log(data);
            var tplStr1=template('tpl1',data);
            $('#product-bijia>.product-list-title').append(tplStr1);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}
//获取商品详情
function getProduct(productid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getproduct',
        data:{
            productid:productid
        },
        success:function(data){
            //console.log(data);
            var tplStr2=template('tpl2',data);
            var tplStr3=template('tpl3',data);
            var tplStr4=template('tpl4',data);
            // console.log(tplStr2);
            // console.log(tplStr3);
            // console.log(tplStr4);
            $('#product-bijia>.product-list-title').append(tplStr2);
            var str=$('#product-bijia>.product-list-title>.list-title3').html().slice(0,13);
            $('#product-bijia>.product-list-title>.list-title3').html(str);
            $('#product-bijia>.product-bijia').append(tplStr3);
            $('#product-bijia>.plist>.bijia').append(tplStr4);
        },
        error:function(){
            console.log("请求出错");
        }
    });
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
            var tplStr5=template('tpl5',data);
            $('#product-bijia>.product-com-list>ul').append(tplStr5);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}