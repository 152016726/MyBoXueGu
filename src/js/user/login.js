$("#login-form").ajaxForm({
    success:function (data) {
        if(data.code==200){
            alert(data.msg);
            location.href='/dist/html/user/login.html';
        }
        else{
            alert('登录失败')
        }
    },
    error:function () {
        alert('登录失败');
    }
})

//jquery中阻止页面默认事件如跳转，用return false即可;
