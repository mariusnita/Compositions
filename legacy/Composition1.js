
function Composition1(ctx) {
    Composition.call(this, ctx);
}

Composition1.prototype = clone(Composition.prototype);

Composition1.prototype.run = function() {
    this.blank();
    for (var x = 0; x < 800; ++x) {
        for (var y = 0; y < 800; ++y) {
            if (x * y < 100000) {
                this.ctx.fillStyle="#aaaa88";
                if (x % 2 == 0 && y % 2 == 0) {
                    this.ctx.fillRect(x,y,1,1);
                } else {
                    this.ctx.fillStyle="#777777";
                    this.ctx.fillRect(800-x,800-y,1,1);
                }
            }

            for (var z = 1; z < 9; ++z) {
                if (x * Math.sqrt(y) < z*1000 + 3000 && x * y > 60000 + z * 10000
                    && x % 1 == 0 && y % 2 == 0) {
                    this.ctx.fillStyle="#88eedd";
                    this.ctx.fillRect(x,y,1,1);
                }
            }
            continue;
            if (Math.sqrt(x) * Math.sin(y) < 122 && Math.cos(x) * Math.cos(y) < 0.03 && Math.cos(y) * Math.cos(y) > 0.028) {
                this.ctx.fillStyle="#111111";
                this.ctx.fillRect(x,y,1,1);
            }
        }
    }    

};

