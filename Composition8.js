
function Composition8(ctx) {
    Composition.call(this, ctx);
    this.paused = false;
}

Composition8.prototype = clone(Composition.prototype);

Composition8.prototype.runFunc = function(prevV,v) {
    if (v < 50000)
        this.blank();
    if (v > 50000 && v < 70000)
        return;
    if (v > 100000 && v < 150000)
        return;
    if (v > 200000 && v < 270000)
        return;
    if (v > 300000 && v < 330000)
        return;
    if (v > 400000 && v < 405000)
        return;
    if (v > 405000 && v < 410000)
        return;
    if (v > 410000 && v < 415000)
        return;
    if (v > 415000 && v < 420000)
        return;
    if (v > 420000 && v < 425000)
        return;
    if (v > 425000 && v < 430000)
        return;
    if (v > 500000)
        return;
    for (var x = 0; x < 800; ++x) {
        for (var y = 0; y < 800; ++y) {
            if (x * y < v && x * y >= prevV) {
                if (x % 2 == 0 && y % 2 == 0) {
                    this.ctx.fillStyle="#00aaaa";
                    if (x * y < 400000)
                        this.ctx.fillRect(x,y,1,1);
                    if (x * y < 100000)
                        this.ctx.fillRect(800-x,y,1,1);
                } else {
                    this.ctx.fillStyle="#777557";
                    if (x * y > 400000)
                        this.ctx.fillRect(800-x,800-y,1,1);
                    if (x * y < 400000)
                    this.ctx.fillRect(x,800-y,1,1);
                }
            }
        }
    }
};

Composition8.prototype.run = function() {
    console.log("run t8");
    this.blank();
    var timeout = 100;
    var j = 0;
    for (var i = 0; i < 600; ++i) {
        this.setTimeout(this.objectExpr() + ".runFunc(" + j + "," + (i * 1000) + ")", timeout);
        j = i * 1000;
        timeout += 40;
    }

    this.setTimeout(this.objectExpr() + ".end()",timeout);
};

