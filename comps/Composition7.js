
function Composition7(ctx) {
    Composition.call(this,ctx);
}

Composition7.prototype = clone(Composition.prototype);

Composition7.prototype.runFunc = function(x) {
    for (var y = this.height - 10; y < this.height; ++y) { 
        this.fillCircle(Math.cos(y)*x,Math.cos(x)*y,5); 
    }
};

Composition7.prototype.run = function() {
    this.blank();
    var timeout=100;

    for (var x = 0; x < this.width; x += 1) {
        var t = this.setTimeout(this.objectExpr() + ".runFunc(" + x + ")", timeout);
        timeout+=20;
    }
};



