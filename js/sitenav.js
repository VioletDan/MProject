getSitenav();
function getSitenav(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getsitenav',
        success:function(data){
            console.log(data);
            var tplStr1=template('tpl1',data);
            $('.link').append(tplStr1);
            
        },
        error:function(){
            console.log("请求出错");
        }
    });
}