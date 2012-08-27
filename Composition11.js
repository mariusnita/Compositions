function Composition11(ctx) {
    Composition.call(this, ctx);
}

Composition11.prototype = clone(Composition.prototype);

Composition11.prototype.runFunc = function(x) {
    var circleColor = '#223344';

    if (x > 350) {
        circleColor = '#993322';
    }

    this.drawCircle(400,400,50,circleColor);

    this.computeColors(0,50,5);

    if (x > 100 && x < 300)
        this.computeColors(0,x,5);
    if (x > 300) {
        this.setColors(['#000']);
    }

    this.drawLine(x,x,799-x,x);
    this.drawLine(x,x,x,799-x);
    this.drawLine(799-x,x,799-x,799-x);
    this.drawLine(x,799-x,799-x,799-x);
};

Composition11.prototype.run = function() {
    this.blank();
    var timeout = 50;
    for (var x = 0; x < 400; ++x) {
        this.setTimeout(this.objectExpr() + '.runFunc(' + x + ')', timeout);
        timeout += 50;
    }
};
