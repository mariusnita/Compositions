
function Composition3(ctx) {
    Composition.call(this,ctx);
}

Composition3.prototype = clone(Composition.prototype);

Composition3.prototype.computeColors = function() {
    this.colors = ["#777777","#999999","#447777","#9999bb","#bb6633","#bb9999"];
};

Composition3.prototype.runFunc = function(x) {
    this.blank();

    var w = this.width;
    var h = this.height;

    for (var i = 0; i < w; i += 2) {
        this.fillCircle(w-i, h-Math.sin(i)*x, 5);
        this.fillCircle(w-i, h-Math.cos(i)*x, 5);
        this.fillCircle(i, Math.sin(i)*x, 5);
        this.fillCircle(i, Math.cos(i)*x, 5);
    }
    for (i = 0; i < h; i += 2) {
        this.fillCircle(w-Math.sin(i)*x, h-i, 5);
        this.fillCircle(w-Math.cos(i)*x, h-i, 5);
        this.fillCircle(Math.sin(i)*x, i, 5);
        this.fillCircle(Math.cos(i)*x, i, 5);
    }
};

Composition3.prototype.run = function() {
    var timeout=100;
    var $this = this;

    for (var x = 0; x < 8000; x += 5) {
        (function(x, timeout) {
            $this.setTimeout(function() {
                $this.runFunc(x);
            }, timeout);
        })(x,timeout);

        timeout+=50;
    }    
};

