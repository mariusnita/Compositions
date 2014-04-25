var FocalUI = (function() {
    var anim = null;
    var started = false;
    var opts = {
        nomenu: false
    };
    var menuShown = true;

    var names = {
        play : ['play','pause'],
        distrib : ['spread','focal'],
        cols : ['mono','colors'],
        flyToTheLight : ['attract','radiate'],
        bound : ['bound','unbound'],
        mouse : ['mouse','unmouse'],
        nomenu : ['no menu', 'menu']
    };

    function menuShowRaw() {
        $('.hid').show();
        $('.first').css('border-radius', '5px 5px 0px 0px');
    }

    function menuHideRaw() {
        $('.hid').hide();
        $('.first').css('border-radius', '5px');
    }

    function menuShow() {
        if (!opts.nomenu)
            return;
        menuShown = true;
        menuShowRaw();
    }

    function menuHide() {
        if (!opts.nomenu)
            return;
        menuShown = false;
        setTimeout(function() {
            if (!menuShown) {
                menuHideRaw();
            }
        }, 500);
    }

    function startStop() {
        if (started) {
            anim.pause();
        }
        else {
            anim.run();
        }

        started = !started;

        $('#play').html(names.play[0 + started]);
    }

    function doOpt(prop) {
        opts[prop] = !opts[prop];
        $('#' + prop).html(names[prop][0+opts[prop]]);

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

    function nomenu() {
        doOpt('nomenu');
        opts.nomenu ? menuHideRaw() : menuShowRaw();
    }

    function initialize() {
        var canvas = document.getElementById("focalCanvas");

        canvas.width = $(window).width();
        canvas.height = $(window).height();

        anim = new Focal(canvas);
        anim.init();

        for (var k in names) {
            $('#' + k).html(names[k][0]);
        }

        $(document).on('mouseenter', '.first,.hid', menuShow);
        $(document).on('mouseleave', '.first,.hid', menuHide);

        $(document).on('keydown',document,function(evt) {
            switch (evt.keyCode) {
            case 83: return startStop(); // p
            case 82: return restart(); // r
            case 67: return cols(); // c
            case 88: return bound(); // x
            case 65: return flyToTheLight(); //a
            case 77: return mouse(); // m
            case 78: return nomenu(); // n
            }
            return null;
        });
        restart();
    }

    $(document).ready(initialize);

    return {
        getAnim : function() { return anim; },
        restart : restart,
        cols : cols,
        startStop : startStop,
        bound : bound,
        mouse : mouse,
        flyToTheLight : flyToTheLight,
        nomenu : nomenu
    };
})();
