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
//console.log(href);// ["categoryid=0"]
var categoryid=href.categoryid;
var count=1;
var totalPage=0;
//请求商品分类名称
getTitle(categoryid);
// 请求商品列表
// 页面加载的时候渲染一次,此时的count 为1
getList(categoryid,count);

//点击事件
$('.prePage').click(function(){
    if(count<=1){
        count=1;
        alert('亲,已经是第一页了哦');
        return;
    }
    count--;
    $('.product-list>ul').empty();
    getList(categoryid,count);
});
$('.nextPage').click(function(){
    if(count>=totalPage){
        count=totalPage;
        alert('亲,已经是最后一页了哦');
        return;
    }
    count++;
    $('.product-list>ul').empty();
    getList(categoryid,count);
});
//点击option选项,切换页面
$('#selectPage').change(function(){
    var options=$('#selectPage').children();
    for(var i=0;i<=options.length;i++){
        if($(options[i]).prop("selected")==true){
            count=options[i].value;
            $('.product-list>ul').empty();
            getList(categoryid,count);
        }
    }
})
function getList(categoryid,count){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getproductlist',
        data:{
            categoryid:categoryid,
            pageid:count
        },
        success:function(data){
            //console.log(data);
            var tplStr1=template('tpl1',data);
            //console.log(tplStr1);
            $('.product-list>ul').append(tplStr1);

            //底部页数渲染
            //当前页面显示的条数
            var pagesize=data.pagesize;
            //后台返回的总条数
            var totalCount=data.totalCount;
            //总的页数
            totalPage=Math.ceil(totalCount/pagesize);
            var html='';
            for(var i=0;i<totalPage;i++){
                if(count==i+1){
                    html+='<option value="'+(i+1)+'"selected>'+(i+1)+'/'+totalPage+'</option>';
                }else{
                    html+='<option value="'+(i+1)+'">'+(i+1)+'/'+totalPage+'</option>';
                }
            }
            $('#selectPage').empty().append(html);
            //console.log(html); 
        },
        error:function(){
            console.log("请求出错");
        }
    });
}

function getTitle(categoryid){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        data:{
            categoryid:categoryid
        },
        success:function(data){
            //console.log(data);
            var tplStr2=template('tpl2',data);
            $('#product-list>.product-list-title').append(tplStr2);
        },
        error:function(){
            console.log("请求出错");
        }
    });
}












