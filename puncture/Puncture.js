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
var e;
function Composite(ctx, base, top) {
    Composition.call(this, ctx);
    this.base = base;
    this.top = top;
    this.polygon = new Polygon();
    e = this;
}

Composite.prototype = extend(Composition, {
    run: function() {
        this.base.run();
        this.top.run();

        this.polygon.points = [
            {x: 100, y: 100}, {x: 400, y: 100},
            {x: 400, y: 400}, {x: 100, y: 400}
        ];

        this.refresh();
    },
    refresh: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        var lines = this.polygon.getLines();
        console.log(lines);

        var bounds = this.polygon.getBounds();

        var baseImageData = this.base.ctx.getImageData(0,0,this.width,this.height);
        var topImageData = this.top.ctx.getImageData(0,0,this.width,this.height);
        var imgData = this.ctx.getImageData(0, 0, this.width, this.height);

        for (var x = bounds.minX; x < bounds.maxX; ++x) {
            for (var y = bounds.minY; y < bounds.maxY; ++y) {
                var idx = (y * this.width + x) * 4;
                var p1 = {x:0, y:0},
                    p2 = {x:x, y:y};
                var intersectCount = 0;
                for (var l = 0; l < lines.length; ++l) {
                    if (doLineSegmentsIntersect(p1, p2, lines[l].p1, lines[l].p2)) {
                        intersectCount++;
                    }
                }
                var p;
                if (intersectCount % 2 === 0) {
                    imgData[idx+3] = 0;
                } else {
                    for (p = 0; p < 4; ++p) {
                        imgData.data[idx+p] = baseImageData.data[idx+p];
                    }
                }
            }
        }
        this.ctx.putImageData(imgData, 0, 0);
    }
});
