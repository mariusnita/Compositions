var anim = null;
var opts = {};

function hideCover() {
    $('.what').hide();
    $('#coverImg').hide();
    $('#myCanvas').show();
}

function what() {
    $('.what').show();
}

var names = {
    play : ['play','pause'],
    distrib : ['spread','focal'],
    cols : ['colors','mono'],
    flyToTheLight : ['attract','radiate'],
    bound : ['bound','unbound']
};

$(document).ready(function() {
    $('#coverImg,.what').click(function() { 
        hideCover(); 
        restart(); 
    });

    var canvas = document.getElementById("myCanvas");

    anim = new Focal(canvas);
    anim.init();

    for (var k in names) {
        $('#' + k).html(names[k][0]);
    }

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
    });
});

var started = false;

function startStop() {
    hideCover();

    if (started) { 
        anim.stop(); 
    }
    else { 
        anim.run(); 
    }

    started = !started;

    $('#play').html(names.play[0 + started]);
}

function doOpt(prop,dontStop) {
    var dist = (opts[prop] === true);

    opts[prop] = !opts[prop];
    $('#' + prop).html(names[prop][0+opts[prop]]);
    anim.setOpts(opts);
}

function restart() {
    var type = $('input[name=restart_type]:checked').val();

    hideCover();
    started = false;
    anim.stop();
    opts.distrib = type === 'cover';
    anim.setOpts(opts);
    anim.init();
    startStop();
}

function cols() {
    doOpt('cols',true);
}

function bound() {
    doOpt('bound',true);
}

function flyToTheLight() {
    doOpt('flyToTheLight',true);
}
