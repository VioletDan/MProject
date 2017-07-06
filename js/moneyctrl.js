//请求省钱空页面内容
var count=0;
var totalPage=0;
//点击按钮切换页面
$('.prePage').click(function(){
    if(count<=0){
        count=0;
        alert('亲,已经是第一页了哦');
        return;
    }
    count--;
    $('.product-list>ul').empty();
    getMoneyctrl(count);
});

$('.nextPage').click(function(){
    if(count>=totalPage-1){
        count=totalPage-1;
        alert('亲,已经是最后一页了哦');
        return;
    }
    count++;
    $('.product-list>ul').empty();
    getMoneyctrl(count);
});
//同步count值 点击option选项,切换页面
$('#selectPage').change(function(){
    var options=$('#selectPage').children();
    for(var i=0;i<=options.length;i++){
        if($(options[i]).prop("selected")==true){
            count=options[i].value;
            $('.product-list>ul').empty();
            getMoneyctrl(count);
        }
    }
})
getMoneyctrl(count);
function getMoneyctrl(count){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrl',
        data:{
            pageid:count
        },
        success:function(data){
            //console.log(data);
            var pagesize=data.pagesize;
            var totalCount=data.totalCount;
            totalPage=Math.ceil(totalCount/pagesize);
            //循环创建option
            var html='';
            for(var i=0;i<totalPage;i++){
                if(count==i+1){
                    html+='<option value="'+(i+2)+'"selected>'+(i+2)+'/'+totalPage+'</option>';
                }else{
                    html+='<option value="'+(i+1)+'">'+(i+1)+'/'+totalPage+'</option>';
                }
            }
            $('#selectPage').empty().append(html);
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