// 返回登录页
$("#backend").on("click",function () {
    $.ajax({
        type:'post',
        url:'/v6/logout',
        dataType:'json',
        success:function (result) {
            console.log(result);
            if(result.code=='200'){
                alert(result.msg);
                location.href='/index.html';
            }
        }
    })
})