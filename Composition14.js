function Composition14(ctx) {
    Composition.call(this, ctx);
}

Composition14.prototype = clone(Composition.prototype);

Composition14.prototype.runFunc = function(x) {
    for (var y = 0; y < this.height; ++y) {
        if (y * Math.abs(Math.sin(x)) < 80) {
            this.drawPoint(x,y);
            if (x % 2 == 0 && y % 2 == 0) {
                this.drawPoint(x,800-y);                
            }
        }
    }
};

Composition14.prototype.mixColor = function(i,j,k,itup) {
    return 'rgb(' + k + ',' + k + ',' + ((k*k)% itup) + ')';
};

Composition14.prototype.run = function() {
    this.blank();
    var timeout = 50;
    this.computeColors(100,200,1);
    for (var x = 0; x < this.width; ++x) {
        this.setTimeout(this.objectExpr() + '.runFunc(' + x + ')', timeout);
        timeout += 10;
    }
};
