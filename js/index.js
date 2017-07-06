
//请求菜单数据
getMenu();
getMoneyctrl();
function getMenu(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getindexmenu',
        success:function(data){
            //console.log(data.result);
            var tplStr=template('tpl1',data);
            //console.log(tplStr);
            $('.row').append(tplStr);
            $('#menu .row .menu-item').eq(7).nextAll('div').hide();
            var count=0;
            $('#menu .row .menu-item').eq(7).click(function(){
                count++;
                if(count%2!=0){
                    $(this).nextAll('div').show();
                }else{
                    $(this).nextAll('div').hide();
                    count=0;
                }
            })
        },
        error:function(){
            console.log('请求出错');
        }
    });
}
//请求折扣数据
function getMoneyctrl(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrl',
        success:function(data){
            //console.log(data);
            var tplStr2=template('tpl2',data);
            $('.product-list>ul').append(tplStr2);
            var number=document.querySelectorAll('#number');
            for(var i=0;i<number.length;i++){
                number[i].innerHTML=number[i].innerHTML.slice(1,2);    
            }
        
        },
        erro:function(){
            console.log('请求出错');
        }
    });

}
