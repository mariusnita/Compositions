function Composition18(ctx) {
    Composition.call(this, ctx);
}

Composition18.prototype = clone(Composition.prototype);

Composition18.prototype.setup = function() {
};

Composition18.prototype.runFunc = function() {
    this.blank('#000');

    var newCircles = [];

    function flip() {
        return Math.floor(Math.random() * 2);
    }


    this.circles.forEach(function(x) {
        this.fillCircle(x.x,x.y,x.radius,x.color);//'rgba(34,188,112,0.3)');
        this.strokeCircle(x.x,x.y,x.radius,2,x.color);

        // if (flip()) {
        //     x.y += Math.random()*20;
        // } else {
        //     x.y -= Math.random()*20;
        // }

        // if (flip()) {
        //     x.x += Math.random()*20;
        // } else {
        //     x.x -= Math.random()*20;
        // }

        x.radius+=x.rate/(5);

        if (x.radius > 200) {
            x.x = Math.random()*this.ctx.canvas.width;
            x.y = Math.random()*this.ctx.canvas.height;
            x.radius = Math.random()*200;
            x.rate = Math.random()*10;
            var col = this.randomColor();
            x.color = col;
        }
    }.bind(this));
};

Composition18.prototype.mixColor = function(i,j,k,itup) {
    return 'rgba(' + i + ',' + j + ',' + k + ',0.5)';
};

Composition18.prototype.doNext = function() {
    this.runFunc();
    this.setTimeout(this.objectExpr() + '.doNext()', 100);
};


Composition18.prototype.run = function() {
    this.setup();
    this.blank('#000');
    this.computeColors(100,200,1);
    this.poo = 0;
    this.circles = [];
    for (var x = 0; x < 50; ++x) {
        this.circles.push({x:Math.random()*this.ctx.canvas.width,
                           y:Math.random()*this.ctx.canvas.height,
                           radius : Math.random()*200,
                           rate : Math.random()*10,
                           color : this.randomColor()
                          });
    }
    
    this.doNext();
};
