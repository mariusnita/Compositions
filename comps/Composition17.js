function Composition17(ctx) {
    Composition.call(this, ctx);
}

Composition17.prototype = clone(Composition.prototype);

Composition17.prototype.setup = function() {
};

Composition17.prototype.runFunc = function() {
    this.blank('#000');
    this.i++;
    var col = this.getColor();
    for (var i = 0.0; i < this.ctx.canvas.width; i += 1) {
        this.fillCircle(i, Math.sin(i/10)*(this.i*(i/100)) + this.ctx.canvas.height/2, 2,col);
        this.fillCircle(this.ctx.canvas.width-i, Math.sin(i/10)*(this.i*(i/100)) + this.ctx.canvas.height/2, 2,col);
    }
};

Composition17.prototype.nextStep = function() {
    this.runFunc();
    this.setTimeout(this.nextStep.bind(this), 100);
};

Composition17.prototype.oscillator = function(x,y) {
    var up = true;
    var i = x;
    return function() {
        if (up) {
            if (i < y) {
                return i++;
            } else {
                up = false;
                return i--;
            }
        } else {
            if (i > x) {
                return i--;
            } else {
                up = true;
                return i++;
            }
        }
    };
};

Composition17.prototype.mixColor = function(i,j,k,itup) {
    return 'rgb(' + i + ',' + j + ',' + k + ')';
};

Composition17.prototype.run = function() {
    this.setup();
    this.blank('#000');
    this.computeColors(100,200,1);
    this.i = 1;
    this.f = this.oscillator(10,10);
    
    this.nextStep();
};
