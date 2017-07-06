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
//var href = subStr(window.location.href);
getDiscount();
function getDiscount(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getinlanddiscount',
        success:function(data){
            // console.log(data);
            var tplStr1=template('tpl1',data);
            $('.cu-friend>ul').append(tplStr1);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}