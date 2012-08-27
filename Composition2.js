
function Composition2(ctx) {
    Composition.call(this, ctx);
}

Composition2.prototype = clone(Composition.prototype);

Composition2.prototype.computeColors = function() {
    return ["#777777","#999999","#447777","#9999bb","#bb6633","#bb9999"];
};

Composition2.prototype.f = function(op) {
    var timeout=100;
    for (var x = op; x < op+30; x += 5) {
        this.setTimeout(this.objectExpr() + ".blank();for (var y = 0; y < 800; ++y) { " + this.objectExpr() + ".drawCircle(800-y,800-Math.sin(y)*"+x+",5) }", timeout);

        this.setTimeout("for (var z = 0; z < 800; ++z) { " + this.objectExpr() + ".drawCircle(800-z,800-Math.cos(z)*"+x+",5) }", timeout);
        this.setTimeout("for (var y = 0; y < 800; ++y) { " + this.objectExpr() + ".drawCircle(y,Math.sin(y)*"+x+",5) }", timeout);
        this.setTimeout("for (var z = 0; z < 800; ++z) { " + this.objectExpr() + ".drawCircle(z,Math.cos(z)*"+x+",5) }", timeout);

        this.setTimeout("for (var y = 0; y < 800; ++y) { " + this.objectExpr() + ".drawCircle(800-Math.sin(y)*"+x+",800-y,5) }", timeout);
        this.setTimeout("for (var z = 0; z < 800; ++z) { " + this.objectExpr() + ".drawCircle(800-Math.cos(z)*"+x+",800-z,5) }", timeout);
        this.setTimeout("for (var y = 0; y < 800; ++y) { " + this.objectExpr() + ".drawCircle(Math.sin(y)*"+x+",y,5) }", timeout);
        this.setTimeout("for (var z = 0; z < 800; ++z) { " + this.objectExpr() + ".drawCircle(Math.cos(z)*"+x+",z,5) }", timeout);

        timeout+=50;
    }
};

Composition2.prototype.g = function(num) {
    for (var x = 0; x<10; ++x) { 
        this.setTimeout(this.objectExpr() + ".f(" + num + ")",this.timeout); 
        this.timeout+=50; 
    }    
};

Composition2.prototype.run = function() {
    this.timeout=50;
    for (var x = 500;x < 3600;x+=100) { this.g(x); }
};
