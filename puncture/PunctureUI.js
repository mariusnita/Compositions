var PunctureUI = (function() {
    function initialize() {
        var altPressed = false;

        $(document).keydown(function(e) {
            if (e.keyCode === 91) {
                altPressed = true;
                console.log(altPressed);
            }
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 91) {
                altPressed = false;
                console.log('de-alt');
            }
        });

        var canvasBase = document.getElementById("baseCanvas");
        var canvasTop = document.getElementById("topCanvas");
        var masterCanvas = document.getElementById("compositeCanvas");

        canvasBase.width = canvasTop.width = masterCanvas.width = Math.ceil($(window).width());
        canvasBase.height = canvasTop.height = masterCanvas.height = Math.ceil($(window).height());

        anim = new PunctureBase(canvasBase);
        anim2 = new PunctureTop(canvasTop);

        var composite = new Composite(masterCanvas, anim, anim2);
        composite.run();

        var setupKnob = function(point) {
            var elem = $('<div class="knob"/>');
            $('.surface').append(elem);

            var w = elem.width(),
                h = elem.height();

            elem.css('left', point.x - w/2)
                .css('top', point.y - h/2);

            elem.drag('drag', (function(point) {
                return function(e) {
                    var knob = $(e.currentTarget);
                    var w = knob.width(),
                        h = knob.height();
                    $(e.currentTarget).css('left', e.clientX - w/2).css('top', e.clientY - h/2);
                    point.x = e.clientX;
                    point.y = e.clientY;
                };
            })(point));

            elem.mousedown((function(point) {
                return function() {
                    console.log('here');
                    if (altPressed) {
                        console.log('adding point');
                        var newPoint = composite.polygon.duplicatePoint(point);
                        setupKnob(newPoint);
                    }
                };
            })(point));

            elem.drag('dragend', function() {
                composite.refresh();
            });
        };

        for (var x = 0; x < composite.polygon.points.length; ++x) {
            var point = composite.polygon.points[x];
            setupKnob(point);
        }

        $(window).on('mouseenter', function() { $('.knob').fadeIn('fast'); });
        $(window).on('mouseleave', function() { $('.knob').fadeOut('fast'); });
    }

    $(document).ready(initialize);

    return {

    };
})();
