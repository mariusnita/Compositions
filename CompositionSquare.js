function CompositionSquare(ctx) {
    Composition.call(this, ctx);
}

CompositionSquare.prototype = clone(Composition.prototype);

CompositionSquare.prototype.runFunc = function(x,go) {
    var v1 = x*x*Math.sin(x)/800;
    var v2 = x*x*Math.sin(x)/100;
    if (v1 <= 1 || v2 <= 1) {
        return;
    }
    this.strokeCircle(50,50,v1,1,x%2 == 0 ? '#993399': '#339933');
    this.strokeCircle(150,50,v1,1,x%2 == 0 ? '#99ffee': '#445533');
    this.strokeCircle(50,150,v2,1,x%2 == 0 ? '#330033': '#229999');
    this.strokeCircle(150,150,v2,1,x%2 == 0 ? '#997733': '#778800');
};

CompositionSquare.prototype.run = function() {
    this.blank();

    var timeout = 50;
    for (var x = 0; x < 400; ++x) {
        this.setTimeout(this.objectExpr() + '.runFunc(' + x + ')', timeout);
        timeout += 50;
    }
    this.setTimeout(this.objectExpr() + '.run()', timeout);
};
