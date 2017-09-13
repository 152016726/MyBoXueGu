//-var path=location.pathname;
// -$(“.nav a”).removeclass(“active”);
// -$(“nav a[href=”’+path+’”]”).addclass(“active”).parent().show();

// 头像信息展示
var tc_avatar=localStorage.getItem('userInfo')!=null?JSON.parse(localStorage.getItem('userInfo')).tc_avatar:'';
var tc_name=JSON.parse(localStorage.getItem('userInfo')).tc_name;
$('#avatar').attr('src',tc_avatar);
$('#monitar').text(tc_name);

// 下拉列表
$('.navs a').on('click', function () {
    $(this).next('ul').slideToggle();
});

// 页面跳转
var path=location.pathname;
$(".nav a").removeClass("active");
$('nav a[href="'+path+'"]').addClass("active").parent("ul").show();

//用户信息的展示通过首页测试就可以，导航下拉列表显示隐藏通过首页测试可以，焦点位置
//除了首页测试，还得通过另外一个子元素