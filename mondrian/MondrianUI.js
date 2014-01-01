var canvas = null;
var mondrian = null;

function mode(m) {
    mondrian.mode = m;
    $('.button').removeClass('active');
    $('.' + m).parent().addClass('active');
}

$(document).ready(function() {
    canvas = document.getElementById('myCanvas');

    mondrian = new Mondrian(canvas);
    mondrian.run();

    mode('vertical');

    $(document).on('keydown', document, function() {
        $('.button').removeClass('active');
        mondrian.restore();
        mondrian.mode = '';
    });
});
