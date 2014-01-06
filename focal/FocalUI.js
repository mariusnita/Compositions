var anim = null;
var opts = {menu: true};

var names = {
    play : ['play','pause'],
    distrib : ['spread','focal'],
    cols : ['mono','colors'],
    flyToTheLight : ['attract','radiate'],
    bound : ['bound','unbound'],
    mouse : ['mouse','unmouse']
};

// yet unused
function menuShow() {
    $('.hid').show();
    $('.first').css('border-radius', '5px 5px 0px 0px');
}

function menuHide() {
    setTimeout(function() { 
        if (!opts.menu) { 
            $('.hid').hide();
            $('.first').css('border-radius', '5px');
        } 
    }, 200);
}


$(document).ready(function() {
    var canvas = document.getElementById("focalCanvas");

    canvas.width = $(window).width();
    canvas.height = $(window).height();

    anim = new Focal(canvas);
    anim.init();

    for (var k in names) {
        $('#' + k).html(names[k][0]);
    }

    // $(document).on('mouseenter', '.first,.hid', menuShow);
    // $(document).on('mouseleave', '.first,.hid', menuHide);
    
    $(document).on('keydown',document,function(evt) {
        if (evt.keyCode === 83) { // p
            startStop();
        }
        if (evt.keyCode === 82) { // r
            restart();
        }
        if (evt.keyCode === 67) { // c
            cols();
        }
        if (evt.keyCode === 88) { // x
            bound();
        }
        if (evt.keyCode === 65) { // a
            flyToTheLight();
        }
        if (evt.keyCode === 77) { // m
            mouse();
        }
        if (evt.keyCode === 78) { // m
            menu();
        }
    });
    restart();
});

var started = false;

function startStop() {
    if (started) { 
        anim.stop(); 
    }
    else { 
        anim.run(); 
    }

    started = !started;

    $('#play').html(names.play[0 + started]);
}

function doOpt(prop) {
    var dist = (opts[prop] === true);

    opts[prop] = !opts[prop];
    $('#' + prop).html(names[prop][0+opts[prop]]);

    opts.menu ? menuShow() : menuHide();

    anim.setOpts(opts);
}

function restart() {
    var type = $('input[name=restart_type]:checked').val();

    started = false;
    anim.stop();
    opts.distrib = type === 'cover';
    opts.cols = true;
    anim.setOpts(opts);
    anim.init();
    startStop();
}

function cols() {
    doOpt('cols');
}

function bound() {
    doOpt('bound');
}

function flyToTheLight() {
    doOpt('flyToTheLight');
}

function mouse() {
    doOpt('mouse');
}

// unused
function menu() {
    doOpt('menu');
}
