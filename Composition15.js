function Composition15(ctx) {
    Composition.call(this, ctx);
}

Composition15.prototype = clone(Composition.prototype);

Composition15.prototype.runFunc = function(white, black) {
    var decisionFuncX = function(x) {
        var w = this.ctx.canvas.width;
        //return Math.ceil(Math.random() * 800) % 100 < Math.sqrt(x) ;

        if (x > w/2)
            x = w - x;

        if (x > w/4 + 10 && x <= w/2 + 10)
            x = w / 2 - x;

        if (x > w/2 + 10 && x <= w * (1/2 + 1/4) + 10)
            x = x - w / 2;

        var s = Math.sqrt(x);
        return Math.floor(s) == s;
    }.bind(this);

    var decisionFuncY = decisionFuncX;

    var startColor = white;
    var color = white;

    function nextColor() {
        color = color === black ? white : black;
    }

    function nextStartColor() {
        startColor = startColor === black ? white : black;
        color = startColor;
        return startColor;
    }

    var lastX = -1, lastY = -1;

    for (var x = 0; x < this.ctx.canvas.width; ++x) {
        if (decisionFuncX(x)) {
            for (var y = 0; y < this.ctx.canvas.height; ++y) {
                if (decisionFuncY(y)) {
                    if (lastX >= 0 && lastY >= 0) {
                        this.fillRect(lastX, lastY, x, y, color);
                        nextColor();
                    }
                    lastY = y;
                }
            }
            lastX = x;
            nextStartColor();
        }
    }
};

Composition15.prototype.mixColor = function(i,j,k,itup) {
    return 'rgb(' + i + ',' + j + ',' + k + ')';
};

Composition15.prototype.doNext = function() {
    this.runFunc(this.getColor(),this.getColor());
    this.setTimeout(this.objectExpr() + '.doNext()', 150);
};

Composition15.prototype.run = function() {
    this.blank();
    this.computeColors(40,120,10);

    this.doNext();
};
