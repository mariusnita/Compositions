function Composition24(ctx) {
    Composition.call(this, ctx);
}

Composition24.prototype = clone(Composition.prototype);

Composition24.prototype.runFunc = function() {

    //console.log(this.x, this.y);
    var rx = Math.random()/5;
    var ry = Math.random()/5;

    if (this.x > this.width/2) {
        this.flip_x = true;
    }
    if (this.x < this.width/2) {
        this.flip_x = false;
    }

    if (this.y > this.height/2) {
        this.flip_y = true;
    }
    if (this.y < this.height/2) {
        this.flip_y = false;
    }

    //console.log(this.flip_x, this.flip_y);
    
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

    this.drawLine(this.x,this.y,this.x + this.momentum_x,this.y + this.momentum_y,'black',2);

    this.x += this.momentum_x;
    this.y += this.momentum_y;

    //this.fillCircle(this.x,this.y,5,'black');

    this.setTimeout(this.objectExpr() + '.runFunc()');
};

Composition24.prototype.run0 = function() {
    this.x = Math.random()*this.width;
    this.y = Math.random()*this.height;
    this.momentum_x = 1;
    this.momentum_y = 1;
    this.flip_x = false;
    this.flip_y = false;

    this.runFunc();
};

Composition24.prototype.run = function() {
    this.blank('white');
    this.run0();
};
