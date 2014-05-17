"use strict";

function PunctureBase(ctx) {
    Composition.call(this, ctx);
}

PunctureBase.prototype = extend(Composition, {
    step: function() {
        this.setTimeout(function() {
            this.step();
        }.bind(this), 100);
    },

    run: function() {
        var x = 0;
        this.blank('#fff');
        while (x <= this.height*2) {
            this.drawLine(0,x,this.width-1,x-600,'#6f0b0b',10);
            x += 20;
        }
    }
});

function PunctureTop(ctx) {
    Composition.call(this, ctx);
}

PunctureTop.prototype = extend(Composition, {
    run: function() {
        var x = 0;
        this.blank('#fff');
        while (x <= this.height) {
            this.fillRect(0, x, this.width, 30, 'black');
            x += 60;
        }
    }
});

function Composite(ctx, base, top) {
    Composition.call(this, ctx);
    this.base = base;
    this.top = top;
    this.polygon = new Polygon();
    /* for debugging */
    window.engine = this;
}

Composite.prototype = extend(Composition, {
    run: function() {
        /* Make the base and the top paint themselves. */
        this.base.run();
        this.top.run();

        /* Put some initial points in the polygon. */
        this.polygon.points = [
            {x: 100, y: 100}, {x: 400, y: 100},
            {x: 400, y: 400}, {x: 100, y: 400}
        ];

        this.refresh();
    },

    refresh: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        var lines = this.polygon.getLines();
        var bounds = this.polygon.getBounds();

        var baseImageData = this.base.ctx.getImageData(0,0,this.width,this.height);
        var imgData = this.ctx.getImageData(0, 0, this.width, this.height);

        /* This loop computes the pixels of the composite canvas. For each pixel,
           if that pixel is inside the polygon, it borrows it from the base canvas.
           If the pixel is outside the polygon, it blanks it out (sets its opacity=0).

           Ultimately, the canvas will contain only opacity=0 pixels, except for
           pixels inside the polygon, which are borrowed from the base canvas. When
           overlayed on another canvas, this gives the illusion that the polygon
           "pokes a hole" in that canvas to reveal the base canvas. */

        /* Iterate only within the polygon bounds. The rest of the pixels are opacity=0
           by the clearRect call above. */
        for (var x = bounds.minX; x < bounds.maxX; ++x) {
            for (var y = bounds.minY; y < bounds.maxY; ++y) {
                var idx = (y * this.width + x) * 4;
                /* p1 and p2 defines a line from the (0,0) corner to the current pixel */
                var p1 = {x:0, y:0},
                    p2 = {x:x, y:y};

                var intersectCount = 0;
                /* This is the ray casting algorithm for determining if a point falls inside a polygon.
                     http://en.wikipedia.org/wiki/Point_in_polygon
                   We count how many times the {(0,0),(x,y)} segment intersects the polygon.
                   Obviously, each polygon line can only be intersected once. If the number
                   of intersections is odd, the point is within the polygon. Otherwise it's outside. */
                for (var l = 0; l < lines.length; ++l) {
                    if (doLineSegmentsIntersect(p1, p2, lines[l].p1, lines[l].p2)) {
                        intersectCount++;
                    }
                }

                if (intersectCount % 2 === 0) {
                    /* Point is outside the polygon. Make it translucent. */
                    imgData[idx+3] = 0;
                } else {
                    /* Point is inside the polygon. Copy the pixel data from the base canvas. */
                    for (var p = 0; p < 4; ++p) {
                        imgData.data[idx+p] = baseImageData.data[idx+p];
                    }
                }
            }
        }
        /* Write the pixels into the composite canvas */
        this.ctx.putImageData(imgData, 0, 0);
    }
});
