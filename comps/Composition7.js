
function Composition7(ctx) {
    Composition.call(this,ctx);
}

Composition7.prototype = clone(Composition.prototype);

Composition7.prototype.runFunc = function(x) {
    for (var y = this.height - 10; y < this.height; ++y) { 
        this.fillCircle(Math.cos(y)*x,Math.cos(x)*y,5); 
    }
};

Composition7.prototype.run = function() {
    this.blank();
    var timeout=100;

    var $this = this;
    for (var x = 0; x < this.width; x += 1, timeout += 20) {
        (function(x,timeout) {
            $this.setTimeout(function() {
                $this.runFunc(x);
            }, timeout);
        })(x,timeout);
    }
};



