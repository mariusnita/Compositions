function Composition10(ctx) {
    Composition.call(this, ctx);
}

Composition10.prototype = clone(Composition.prototype);

Composition10.prototype.drawCurve = function(prevV,v) {
    this.blank();
    for (var x = 0; x < 800; ++x) {
        for (var y = 0; y < 800; ++y) {
            if (x * y < v && x * y >= prevV) {
                this.ctx.fillStyle="#aaaa88";
                if (x % 2 == 0 && y % 2 == 0) {
                    this.ctx.fillRect(x,y,1,1);
                } else {
                    this.ctx.fillStyle="#777777";
                    this.ctx.fillRect(800-x,800-y,1,1);
                }
            }
        }
    }    
};

Composition10.prototype.drawWave = function(z) {
    this.blank();
    for (var x = 0; x < 800; ++x) {
        for (var y = 0; y < 800; ++y) {
            if (x * Math.sqrt(y) < z*1000 + 3000 && x * y > 60000 + z * 10000
                && x % 1 == 0 && y % 2 == 0) {
                this.ctx.fillStyle="#88eedd";
                this.ctx.fillRect(x,y,1,1);
            }
        }
    }
};


Composition10.prototype.runFunc = function(prevV,v) {
    this.blank();
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

Composition10.prototype.run = function() {
    this.blank();
    var timeout = 100;
    var j = 0;
    for (var i = 0; i < 100; ++i) {
        this.setTimeout(this.objectExpr() + ".drawCurve(" + j + "," + (i * 1000) + ")", timeout);
        j = i * 1000;
        timeout += 40;
    }

    for (var z = 1; z < 9; ++z) {
        this.setTimeout(this.objectExpr() + ".drawWave(" + z + ")", timeout);
        timeout += 200;
    }
    j = 0;
    for (i = 0; i < 150; ++i) {
        this.setTimeout(this.objectExpr() + ".runFunc(" + j + "," + (i * 1000) + ")", timeout);
        j = i * 1000;
        timeout += 40;
    }
    this.setTimeout(this.objectExpr() + ".end()",timeout);
};
