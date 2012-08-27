
function Composition3(ctx) {
    Composition.call(this,ctx);
}

Composition3.prototype = clone(Composition.prototype);

/* override */ //Composition3.prototype.getColor = function() {
//    return '#666666';
//};

Composition3.prototype.run = function() {
    var timeout=100;
    for (var x = 0; x < 8000; x += 5) {
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

