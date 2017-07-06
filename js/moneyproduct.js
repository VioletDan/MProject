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
getMoneyctrlproduct(productid);
function getMoneyctrlproduct(productid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data:{
            productid:productid
        },
        success:function(data){
            console.log(data);
            var tplStr1=template('tpl1',data);
            var tplStr2=template('tpl2',data);
            $('.cu-content').append(tplStr1);
            $('.cu-content').append('<div class="golink"><a href="#">前往购买</a></div>');
            $('.container').append(tplStr2);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}