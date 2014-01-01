function Composition19(ctx) {
    Composition18.call(this, ctx);
}

Composition19.prototype = clone(Composition18.prototype);

Composition19.prototype.runFunc = function() {
    this.blank('#000');

    var newCircles = [];

    this.poo += 1;

    this.circles.forEach(function(x) {
        if (this.poo < 10 || this.poo >= 50) {
            x.x += 5;
            x.y += 5*((800-x.x)/(800-x.y));
            if (this.poo >= 50) { this.poo = 0; }
        } if (this.poo >= 10 && this.poo < 20) {
            x.x += 30;
            x.y -= 30*((x.x)/(x.y));
        } else if (this.poo >= 20 && this.poo < 30) {
            x.x -= 50;
            x.y += 50*((x.x)/(x.y));
        }
        else if (this.poo >= 30 && this.poo < 40) {
            x.x -= 50;
            x.y -= 30*((x.y)/(x.x));
        }
        else if (this.poo >= 40 && this.poo < 50) {
            x.x += 5;
            x.y -= 40*((x.y)/(x.x));
        }

        this.fillCircle(x.x,x.y,x.radius,x.color);//'rgba(34,188,112,0.3)');
        this.strokeCircle(x.x,x.y,x.radius,2,x.color);

        x.radius-=x.rate/5;

        if (x.radius <=5 || x.x < 0 || x.x >= this.ctx.canvas.width || x.y < 0 || x.y > this.ctx.canvas.height) {
            x.x = Math.random()*this.ctx.canvas.width;
            x.y = Math.random()*this.ctx.canvas.height;
            x.radius = Math.random()*200;
            x.rate = Math.random()*10;
            var col = this.randomColor();
            x.color = col;
        }
    }.bind(this));
};
