
function Composition4(ctx) {
    Composition.call(this,ctx);
}

Composition4.prototype = clone(Composition.prototype);

Composition4.prototype.runFunc = function(x) {
    this.blank();
    for (var y = 0; y < this.width; ++y) { 
        this.fillCircle(y,Math.cos(y)*x,5); 
    }
};

Composition4.prototype.run = function() {
    var timeout=100;
    var $this = this;
    for (var x = 0; x < this.width; x += 1) {
        (function(x, timeout) {
            $this.setTimeout(function() {
                $this.runFunc(x);
            }, timeout);
        })(x, timeout);

        timeout+=50;
    }
};
