function Composition23(ctx) {
    Composition.call(this, ctx);
}

Composition23.prototype = clone(Composition.prototype);

Composition23.prototype.runFunc = function() {
    var center_x = this.ctx.canvas.width / 2;
    var center_y = this.ctx.canvas.height / 2;

    for (var x = 0; x < this.ctx.canvas.width; x += 10) {
        for (var y = 0; y < this.ctx.canvas.height; y += 10) {
            var r = Math.ceil(Math.random() * 255);
            var g = Math.ceil(Math.random() * 255);
            var b = Math.ceil(Math.random() * 255);
            this.drawLine(x,y,center_x,center_y,col(r,g,b));
        }
    }

    this.setTimeout(this.objectExpr() + '.runFunc()');
};

function col(r,g,b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Composition23.prototype.run = function() {
    this.runFunc();
};
