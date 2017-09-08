resize();
window.onresize = function() {
    resize();
}

function resize() {

    // var screenWidth = document.body.offsetWidth;
    var screenWidth = document.querySelector('body').offsetWidth;
    var title = document.querySelector("title");
    if (screenWidth <= 768) {
        title.innerHTML = "极小屏幕" + screenWidth;
    } else if (screenWidth > 768 && screenWidth <= 992) {
        title.innerHTML = "小屏幕" + screenWidth;
    } else if (screenWidth > 992 && screenWidth <= 1200) {
        title.innerHTML = "普通屏幕" + screenWidth;
    } else if (screenWidth > 1200) {
        title.innerHTML = "大屏幕" + screenWidth;
    }
}