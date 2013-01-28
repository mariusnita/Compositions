function Composition20(ctx) {
    Composition17.call(this, ctx);
}

Composition20.prototype = clone(Composition17.prototype);

Composition20.prototype.runFunc = function() {
    var w = this.ctx.canvas.width;
    var h = this.ctx.canvas.height;

    this.blank('#000');
    this.i+=10;

    for (var i = 0.0; i < h; i += 1) {
        var x = i;
        this.drawCircle(Math.sin((x+this.i)/(10 * Math.sqrt(x/10000)))*(5+(x/5)) + w*(1/3), i, 2,'white');
        this.drawCircle(Math.sin((x+this.i/10)/(10 * Math.sqrt(x/10000)))*(10) + w*(2/3), i, 2,'white');
    }
};
