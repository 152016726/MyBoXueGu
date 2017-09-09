$('#backoff').on('click',function () {
    $.ajax({
        type:"post",
        url:'/v6/logout',
        success:function (data) {
            alert(data.msg);
            location.href='../../../../index.html';
        }
    })
})