function Composition25(ctx) {
    Composition.call(this, ctx);
}

Composition25.prototype = clone(Composition.prototype);

Composition25.prototype.runFunc = function() {
    var rx = Math.random()*20;
    var ry = Math.random()*20;

    if (Math.random() > 0.5) { rx = -rx; }
    if (Math.random() > 0.5) { ry = -ry; }
    
    if (!this.flip_x) {
        this.momentum_x += rx;
    } else {
        this.momentum_x -= rx;
    }

    if (!this.flip_y) {
        this.momentum_y += ry;
    } else {
        this.momentum_y -= ry;
    }

    this.drawLine(this.x,this.y,this.x + this.momentum_x,this.y + this.momentum_y,this.color,3);

    this.x += this.momentum_x;
    this.y += this.momentum_y;

    if (Math.random() > 0.8) {
        this.init();
    }

    if (Math.random() > 0.99) {
        this.blank('rgba(255,255,255,0.01)');
    }

    this.setTimeout(this.objectExpr() + '.runFunc()');
};

Composition25.prototype.init = function() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.momentum_x = 1;
    this.momentum_y = 1;
    this.color = 'black';
};

Composition25.prototype.run = function() {
    this.init();
    this.flip_x = false;
    this.flip_y = false;

    this.blank('white');
    this.runFunc();
};
