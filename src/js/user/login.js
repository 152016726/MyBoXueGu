//表格动态
$(document).ready(function(){
    var $tab_li = $('#tab ul li');
    $tab_li.hover(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $tab_li.index(this);
        $('div.tab_box > div').eq(index).show().siblings().hide();
    });
    $(".screenbg ul li").each(function(){
        $(this).css("opacity","0");
    });
    $(".screenbg ul li:first").css("opacity","1");
    var index = 0;
    var t;
    var li = $(".screenbg ul li");
    var number = li.length;
    console.log(number);
    function change(index){
        li.css("visibility","visible");
        li.eq(index).siblings().animate({opacity:0},3000);
        li.eq(index).animate({opacity:1},3000);
    }
    function show(){
        index = index + 1;
        if(index <= number-1){
            change(index);
        }else{
            index = 0;
            change(index);
        }
    }
    t = setInterval(show,8000);
    //根据窗口宽度生成图片宽度
    var width = $(window).width();
    $(".screenbg ul img").css("width",width+"px");
});


//提交后台数据
$("#login-form").ajaxForm({
    success:function (data) {
        if(data.code==200){
            alert(data.msg);
            console.log(data.result);
            //存取缓存
            localStorage.setItem('userInfo',JSON.stringify(data.result));
            location.href='/dist/html/user/login.html';
        }
        else{
            alert('登录失败')
        }
    },
    error:function () {
        alert('登录失败');
    }
});


//账号和密码的简单验证
function suitable(key) {
    $(key).on('blur',function () {
        if($(this).val()==''){
            $('.stu_error_box').text('请输入对应信息').fadeIn(1000).delay(2000).fadeOut(2000);
            // $('#tab-bt').addClass('disabled');
            $('#tab-bt').attr('disabled','disabled');
            return;
        }else{
            $('#tab-bt').attr('disabled',false);
        }
    });
}
suitable("#stu_username_hide");
suitable("#stu_password_hide");
suitable("#stu_code_hide");

//异步获取验证码
$("#verify").on('click',function () {
    $('#verify').addClass('disabled');
    var total = 5;
    var timerId;
    timerId = setInterval(function(){
        total--;
        $('#verify').val(total+'秒之后重新获取');
        if(total == 0){
            clearInterval(timerId);
            $('#verify').removeClass('disabled').val('获取验证码');
        }
    },1000);
    $.ajax({
        url:'/php.php',
        success:function (data) {
            $("#stu_code_hide").val(data);
        }
    })
});





//jquery中阻止页面默认事件如跳转，用return false即可;
