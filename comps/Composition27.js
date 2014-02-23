function Composition27(ctx) {
    Composition.call(this, ctx);
}

Composition27.prototype = _.extend(clone(Composition.prototype), {
    runFunc : function() {
        var x = this.x;

        this.blank(this.bg);

        for (var p = 0; p < this.points.length; ++p) {
            for (var i = 0; i < 500; ++i) {
                this.strokeCircle(this.points[p].x, 
                                  this.points[p].y, 
                                  i * Math.sqrt(x) / 1.2, 0.8, '#666');
                this.strokeCircle(this.mouse.x, 
                                  this.mouse.y, 
                                  i * Math.sqrt(x) / 1.2, 0.8, '#666');
            }
        }

        this.setTimeout(function() {
            this.runFunc();
        }.bind(this), 40);
    },

    disturbPoints : function() {
        for (var p = 0; p < this.points.length; ++p) {
            if (this.flipCoin())
                this.points[p].x += 0.1;
            else
                this.points[p].x -= 0.1;
        }

        this.setTimeout(function() {
            this.disturbPoints();
        }.bind(this), 10);
    },

    run : function() {
        this.bg = 'white';
        this.x = 10;

        this.mouse = this.randomPoint();
        this.points = [this.randomPoint(), this.randomPoint()];

        this.blank(this.bg);

        this.runFunc();

        this.listenToMouse(function(mp) {
            this.mouse = mp;
        }.bind(this));

        this.addEventListener('mousedown', function(ev) {
            var pt = this.getMousePos(ev);
            this.points.pop();
            this.points.unshift(pt);
        }.bind(this));

        this.disturbPoints();
    }
});
