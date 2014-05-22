
function Composition28(ctx) {
    Composition.call(this, ctx);
}

Composition28.prototype = _.extend(clone(Composition.prototype), {
    run : function() {
        this.level = 0;

        this.colors = Gradient.gradient('#000','#ab8',8);
        this.colors = Gradient.gradient('#53e3ff','#000e4a',16);
        //this.colors = ['black','white'];

        this.doQuad(0, 0, this.width, this.height, 0);

        this.flag = true;
        //this.runFunc();
    },

    doQuad : function(x,y,width,height,level) {
        var p = function() { return this.randomInt(10) * (this.flipCoin() ? -1 : 1); }.bind(this);
        var perturbX1 = p(),
            perturbY1 = p(),
            perturbX2 = p(),
            perturbY2 = p();

        //this.drawLine(x+width/2 + perturbX1, y + perturbY1, x+width/2 + perturbX2, y+height + perturbY2);
        //this.drawLine(x - perturbX1, y+height/2 - perturbY1, x+width - perturbX2, y+height/2 - perturbY2);

        //this.fillCircle(x+1/3*width, y+1/3*height, height/4, this.cols[level]);
        //this.fillCircle(x+2/3*width, y+2/3*height, height/4, this.cols[level]);
        //this.fillCircle(x+1/3*width, y+2/3*height, height/4, this.cols[level]);
        //this.fillCircle(x+2/3*width, y+1/3*height, height/4, this.cols[level]);

        //this.fillCircle(x+width/2+perturbX1,y+height/2+perturbY1,height/2,this.cols[level]);

        this.fillRect(x,y,width,height);

        if (level < 8) {
            var w = width/2,
                h = height/2;

            // nw
            this.setTimeout(function() { this.doQuad(x,y,w,h,level+1); }.bind(this),this.randomInt(500));
            // ne
            this.setTimeout(function() { this.doQuad(x+w,y,w,h,level+1); }.bind(this),this.randomInt(500));
            // sw
            this.setTimeout(function() { this.doQuad(x,y+h,w,h,level+1); }.bind(this),this.randomInt(500));
            // se
            this.setTimeout(function() { this.doQuad(x+w,y+h,w,h,level+1); }.bind(this),this.randomInt(500));
        }
    },

    drawRects : function() {
        var rectWidth = 300,
            currentColor = this.flag ? '#fff' : '#000',
            idx = Math.floor(Math.random() * 200);

        while (idx < this.width) {
            this.fillRect(idx, 0, rectWidth, this.height, currentColor);
            idx += rectWidth;
            currentColor = currentColor === '#fff' ? '#000' : '#fff';
        }
    },

    runFunc : function() {
        //this.drawRects();

        this.flag = !this.flag;

        this.setTimeout(function() {
            this.runFunc();
        }.bind(this), 80);
    }
});
