function Composition5(ctx) {
    Composition.call(this,ctx);
}

Composition5.prototype = clone(Composition.prototype);

Composition5.prototype.runFunc = function(prevV,v) {
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

Composition5.prototype.run = function() {
    var timeout = 100;
    var j = 0;

    var $this = this;
    for (var i = 0; i < this.width; ++i) {
        (function(i,j,timeout) {
            $this.setTimeout(function() {
                $this.runFunc(j, i*1000);
            }, timeout);
        })(i,j,timeout);

        j = i * 1000;
        timeout += 40;
    }
};
