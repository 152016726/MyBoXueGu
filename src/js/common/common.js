require('./aside.js');
require('./header.js');
$('.navs a').on('click', function () {
    $(this).next('ul').slideToggle();
});