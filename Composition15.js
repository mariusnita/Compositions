function Composition15(ctx) {
    Composition.call(this, ctx);
}

Composition15.prototype = clone(Composition.prototype);

Composition15.prototype.runFunc = function(white, black) {
    var decisionFuncX = function(x) {
        //return Math.ceil(Math.random() * 800) % 100 < Math.sqrt(x) ;

        if (x > 400)
            x = 800-x;

        if (x > 190 && x < 410)
            x = 400 - x;
        if (x > 410 && x < 610)
            x = x - 400;

        var s = Math.sqrt(x);
        return Math.floor(s) == s;
    };

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

    for (var x = 0; x < 800; ++x) {
        if (decisionFuncX(x)) {
            for (var y = 0; y < 800; ++y) {
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
    return 'rgb(' + i%itup + ',' + j%itup + ',' + ((k)% itup) + ')';
    return 'rgb(' + k + ',' + k + ',' + ((k*k)% itup) + ')';
    //return 'rgb(255,255,255)';
};

Composition15.prototype.doNext = function() {
    this.runFunc(this.getColor(),this.getColor());
    this.setTimeout(this.objectExpr() + '.doNext()', 100);
};

Composition15.prototype.run = function() {
    this.blank();
    this.computeColors(200,240,1);

    this.doNext();
};
