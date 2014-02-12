function Composition21(ctx) {
    Composition17.call(this, ctx);
}

Composition21.prototype = clone(Composition17.prototype);

Composition21.prototype.runFunc = function() {
    var w = this.ctx.canvas.width;
    var h = this.ctx.canvas.height;

    this.blank('#000');
    this.i++;;

    var f = 10;//this.f();

    var y_diff = Math.sin((w-1+f)/(10))*(f*10);

    var pts = [];
    var max_y = 0;

    for (var i = 0; i < w; ++i) {
        var x = i;
        var y_val = Math.sin((x+this.i)/(10))*(f) + h*(1/2);

        pts.push({x:i, y:y_val});

        if (y_val > max_y)
            max_y = y_val;
    }

    //max_y = max_y + w/2;

    max_y -= h/2;

    pts.forEach(function(p) {
        var c = this.getColor();
        for (var x = 0; x < 10; ++x) {
            this.fillCircle(x*x/10*20+p.x,x*10+p.y - max_y,4,c);
            this.fillCircle(x*x/10*20+p.x,-x*10+p.y - max_y,4,c);
        }
    }.bind(this));
};
