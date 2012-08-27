function Composition13(ctx) {
    Composition.call(this, ctx);
}

Composition13.prototype = clone(Composition.prototype);

Composition13.prototype.runFunc = function() {
    this.blank();
    this.drawCircle(1200,900,600,'#222');

    this.strokeCircle(1200,900,600,3,'#333');
    this.strokeCircle(1200,900,602,1,'#fff');

    this.drawCircle(this.star.x, this.star.y, this.star.size, '#222');
    this.strokeCircle(this.star.x, this.star.y, this.star.size, 1, '#333');
    this.advanceStar();

    for (var x = 0; x < this.lines.length; ++x) {
        this.drawLine(0,0,this.lines[x].x, this.lines[x].y);
        this.advanceLine(this.lines[x]);
    }

    this.setTimeout(this.objectExpr() + ".runFunc()", 20);
};

Composition13.prototype.advanceLine = function(l) {
    if (l.y >= 799 && l.x > 0) {
        l.x --;
    } else if (l.x == 0) {
        l.x = 799;
        l.y = 0;
    } else {
        l.y ++;
    }
};

Composition13.prototype.advanceStar = function() {
    this.star.x = this.star.x + 1/this.star.x;
    this.star.y ++;
    this.star.size = this.star.size + 1/this.star.size;

    if (this.star.y >= 800 + this.star.size) {
        this.star = { x : 20, y : 0, size : 1 };
    }
};

Composition13.prototype.run = function() {
    this.lines = [];
    this.star = { x : 20, y : 0, size : 1 };
    
    var p = 0;
    for (var x = 0; x < 40; ++x) {
        this.lines.push({ x : 799, y : p });
        this.lines.push({ x : 799-p, y : 799 });
        p += 20;
    }
    // this.computeColors(20,180,10);
    this.setTimeout(this.objectExpr() + ".runFunc()", 20);
};
