function Composition11(ctx) {
    Composition.call(this, ctx);
}

Composition11.prototype = clone(Composition.prototype);

Composition11.prototype.runFunc = function(x,y) {
    var circleColor = '#223344';

    if (x > 350) {
        circleColor = '#993322';
    }

    this.fillCircle(this.width/2,this.height/2,50,circleColor);

    this.computeColors(0,50,5);

    if (x > 100 && x < 300)
        this.computeColors(0,x,5);
    if (x > 300) {
        this.setColors(['#000']);
    }

    this.drawLine(x,y,this.width-x,y);
    this.drawLine(x,y,x,this.height-y);
    this.drawLine(this.width-x,y,this.width-x,this.height-y);
    this.drawLine(x,this.height-y,this.width-x,this.height-y);
};

Composition11.prototype.run = function() {
    this.blank();
    var timeout = 50;
    var multiplier = this.height/this.width;

    var $this = this;
    for (var x = 0, y = 0; x < this.width/2; ++x, timeout += 50, y = x * multiplier) {
        (function(x,y,timeout) {
            $this.setTimeout(function() {
                $this.runFunc(x,y);
            }, timeout);
        })(x,y,timeout);   
    }
};
