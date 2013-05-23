
function Composition7(ctx) {
    Composition.call(this,ctx);
}

Composition7.prototype = clone(Composition.prototype);

Composition7.prototype.runFunc = function(x) {
    for (var y = 790; y < 800; ++y) { 
        this.drawCircle(Math.cos(y)*x,Math.cos(x)*y,5); 
    }
};

Composition7.prototype.endLoop = function() {
    if (typeof this.endCallback == 'function') {
        this.endCallback();
    } else {
        this.runFunc(799);
        this.setTimeout(this.objectExpr() + ".endLoop()",50);
    }
};

Composition7.prototype.run = function() {
    this.blank();
    var timeout=100;
    for (var x = 0; x < this.width; x += 1) {
        var t = this.setTimeout(this.objectExpr() + ".runFunc(" + x + ")", timeout);
        this.timeouts.push(t);
        timeout+=20;
    }
    var t = this.setTimeout(this.objectExpr() + ".endLoop()",timeout);
};



