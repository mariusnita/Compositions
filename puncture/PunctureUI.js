/* Tracks if a modifier key is pressed down */
var KeyCatcher = (function() {
    "use strict";

    var modifierPressed = false;

    $(document).keydown(function(e) {
        if (e.keyCode === 91) {
            modifierPressed = true;
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 91) {
            modifierPressed = false;
        }
    });

    return {
        pressed: function() { return modifierPressed; }
    };
})();

/* Main init function */
(function() {
    "use strict";

    function setupKnob(composite, point) {
        /* Make new knob and add it to the surface */
        var elem = $('<div class="knob"/>');
        $('.surface').append(elem);

        var w = elem.width(),
            h = elem.height();

        /* position the knob at the point location */
        elem.css('left', point.x - w/2)
            .css('top', point.y - h/2);

        elem.drag('drag', function(e) {
            /* When dragging on the knob, move the knob to the new mouse position */
            var knob = $(e.currentTarget);
            var w = knob.width(),
                h = knob.height();
            knob.css('left', e.clientX - w/2).css('top', e.clientY - h/2);

            /* Also set the point's coordinates to the new position. */
            point.x = e.clientX;
            point.y = e.clientY;
        });

        elem.mousedown(function() {
            /* If the modifier is pressed on mousedown, duplicate the current point
               and give it its own knob. This is a way to add new knobs/polygon points
               to the surface. */
            if (KeyCatcher.pressed()) {
                var newPoint = composite.polygon.duplicatePoint(point);
                setupKnob(composite, newPoint);
            }
        });

        elem.drag('dragend', function() {
            /* When done dragging, re-render the composite. */
            composite.refresh();
        });
    }

    function initialize() {
        /* Set up the three canvases. */
        var canvasBase = document.getElementById("baseCanvas");
        var canvasTop = document.getElementById("topCanvas");
        var masterCanvas = document.getElementById("compositeCanvas");

        canvasBase.width = canvasTop.width = masterCanvas.width = Math.ceil($(window).width());
        canvasBase.height = canvasTop.height = masterCanvas.height = Math.ceil($(window).height());

        var composite = new Composite(
            masterCanvas,
            new PunctureBase(canvasBase),
            new PunctureTop(canvasTop)
        );

        composite.run();

        /* Add control knobs for the initial polygon points, if any. */
        for (var x = 0; x < composite.polygon.points.length; ++x) {
            var point = composite.polygon.points[x];
            setupKnob(composite, point);
        }

        /* Hide the knobs when the mouse is not on the surface. */
        $(window).on('mouseenter', function() { $('.knob').fadeIn('fast'); });
        $(window).on('mouseleave', function() { $('.knob').fadeOut('fast'); });
    }

    $(document).ready(initialize);
})();
