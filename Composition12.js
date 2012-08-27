function Composition12(ctx) {
    Composition.call(this, ctx);
}

Composition12.prototype = clone(Composition.prototype);

Composition12.prototype.runFunc = function(x,go) {
    var v1 = x*x*Math.sin(x)/800;
    var v2 = x*x*Math.sin(x)/100;
    if (v1 <= 1 || v2 <= 1) {
        return;
    }
    this.strokeCircle(200,200,v1,1,x%2 == 0 ? '#993399': '#339933');
    this.strokeCircle(600,200,v1,1,x%2 == 0 ? '#99ffee': '#445533');
    this.strokeCircle(200,600,v2,1,x%2 == 0 ? '#330033': '#229999');
    this.strokeCircle(600,600,v2,1,x%2 == 0 ? '#997733': '#778800');
};

Composition12.prototype.run = function() {
    this.blank();

    var timeout = 50;
    for (var x = 0; x < 400; ++x) {
        this.setTimeout(this.objectExpr() + '.runFunc(' + x + ')', timeout);
        timeout += 50;
    }
}
