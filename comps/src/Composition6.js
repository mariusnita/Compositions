
function Composition6(ctx) {
    Composition.call(this,ctx);
}

Composition6.prototype = clone(Composition.prototype);

Composition6.prototype.drawCurve = function(prevV,v) {
    for (var x = 0; x < this.width; ++x) {
        for (var y = 0; y < this.height; ++y) {
            if (x * y < v && x * y >= prevV) {
                this.ctx.fillStyle="#aaaa88";
                if (x % 2 == 0 && y % 2 == 0) {
                    this.ctx.fillRect(x,y,1,1);
                } else {
                    this.ctx.fillStyle="#777777";
                    this.ctx.fillRect(this.width-x,this.height-y,1,1);
                }
            }
        }
    }    
};

Composition6.prototype.drawWave = function(z) {
    for (var x = 0; x < this.width; ++x) {
        for (var y = 0; y < this.height; ++y) {
            if (x * Math.sqrt(y) < z*1000 + 3000 && x * y > 60000 + z * 10000
                && x % 1 == 0 && y % 2 == 0) {
                this.ctx.fillStyle="#88eedd";
                this.ctx.fillRect(x,y,1,1);
            }
        }
    }
};


Composition6.prototype.runFunc = function(prevV,v) {
    if (v < 70000)
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
    for (var x = 0; x < this.width; ++x) {
        for (var y = 0; y < this.height; ++y) {
            if (x * y < v && x * y >= prevV) {
                if (x % 2 == 0 && y % 2 == 0) {
                    this.ctx.fillStyle="#00aaaa";
                    if (x * y < 400000)
                        this.ctx.fillRect(x,y,1,1);
                    if (x * y < 100000)
                        this.ctx.fillRect(this.width-x,y,1,1);
                } else {
                    this.ctx.fillStyle="#777557";
                    if (x * y > 400000)
                        this.ctx.fillRect(this.width-x,this.height-y,1,1);
                    if (x * y < 400000)
                    this.ctx.fillRect(x,this.height-y,1,1);
                }
            }
        }
    }
};

Composition6.prototype.run = function() {
    this.blank();
    var timeout = 100;
    var j = 0;

    var $this = this;

    for (var i = 0; i < 100; ++i) {
        (function(i,j,timeout) {
            $this.setTimeout(function() {
                $this.drawCurve(j, i*1000);
            }, timeout);
        })(i,j,timeout);

        timeout+= 40;
        j = i * 1000;
    }

    for (var z = 1; z < 9; ++z) {
        (function(z,timeout) {
            $this.setTimeout(function() {
                $this.drawWave(z);
            }, timeout);
        })(z,timeout);

        timeout += 40;
    }

    for (i = 0, j = 0; i < this.width; ++i) {
        (function(i,j,timeout) {
            $this.setTimeout(function() {
                $this.runFunc(j, i*1000);
            }, timeout);
        })(i,j,timeout);

        timeout+= 40;
        j = i * 1000;
    }
};
