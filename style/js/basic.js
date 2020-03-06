// 窗口大小伸缩
$(document).ready(function() {
    var y = 0;
    var cy = 0;
    var move_separator = false;
    var main_code = document.getElementById('main_code');
    console.log($('#main_code').css('height'));
    console.log($('#main_code').height());
    var separator = document.getElementById('separator_of_code_ghost');
    $('#separator_of_code').mousedown(function(e) {
        if (e.which == 1) {
            move_separator = true;
            separator.style.visibility = 'visible';
            y = e.clientY;
        }
    });
    $(window).mousemove(function(e) {
        if (move_separator) {
            cy = e.clientY;
            console.log(cy);
            separator.style.top = (cy - y) + 'px';
        }
    });
    $(window).mouseup(function() {
        if (move_separator) {
            move_separator = false;
            var bot = $(document.body).height();
            bot = parseInt(bot) - cy - 5;
            separator.style.visibility = 'hidden';
            main_code.style.height = bot + 'px';
            separator.style.top = '0px';
        }
    });
});

$(document).ready(function() {

});