function Composition26(ctx) {
    Composition.call(this, ctx);
}

Composition26.prototype = clone(Composition.prototype);

Composition26.prototype.runFunc = function() {
    var x = this.x;

    this.blank(this.bg);

    for (var i = 0; i < 500; ++i) {
        var c1 = '#444';
        var c2 = '#888';

        if (this.mouse) {
            this.strokeCircle(this.mouse.x, 
                              this.mouse.y, 
                              i * Math.sqrt(x) / 1.2, 0.8, c1);
            this.strokeCircle(this.pt1.x + this.pt1.x - this.mouse.x,
                              this.pt1.y + this.pt1.y - this.mouse.y,
                              i * Math.sqrt(x) / 1.2, 0.8 , c2);
        }
    }

    this.setTimeout('{0}.runFunc()'.format(this.objectExpr()), 40);
};

Composition26.prototype.disturbPoints = function() {
    if (this.flipCoin())
        this.pt1.x += 0.1;
    else
        this.pt1.x -= 0.1;

    this.setTimeout('{0}.disturbPoints()'.format(this.objectExpr()), 10);
};

Composition26.prototype.run = function() {
    this.bg = 'white';
    this.line = 'green';
    this.x = 10;
    this.mouse = {x:this.width/2, y:this.height/2};

    this.pt1 = {x:this.width/2, y:this.height/2+20};

    this.blank(this.bg);

    this.runFunc();

    this.listenToMouse(function(mp) {
        this.mouse = mp;
    }.bind(this));

    this.disturbPoints();
};
