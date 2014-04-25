'use strict';

function Composition30(ctx) {
    Composition.call(this, ctx);
}

Composition30.prototype = _.extend(clone(Composition.prototype), {
    run : function() {
        var startY = 20;
        var side = Math.floor(this.height - 40);
        var startX = Math.floor(Math.abs(this.width - this.height)/2);
        this.doQuad(startX, startY, side, side, 0);
        this.strokeRect(startX, startY, side, side, '#000', 10);
        this.colors = ['red', 'yellow', 'blue'];
    },
    color : function() {
        if (this.randomInt(10) < 6)
            return '#fff';
        return this.getColor();
    },
    test : function() { return this.randomInt(10) < 6; },
    doQuad : function(x,y,width,height,level) {
        x = Math.floor(x);
        y = Math.floor(y);
        height = Math.ceil(height);
        width = Math.ceil(width);
        this.fillRect(x+5,y+5,width-10,height-10,this.color());

        if (level < 4) {
            this.drawLine(Math.floor(x+width/2), y,
                          Math.floor(x+width/2), y+height,
                          '#000', 10);

            this.drawLine(x, Math.floor(y+height/2),
                          x+width, Math.floor(y+height/2),
                          '#000', 10);

            var w = width/2,
                h = height/2;

            if (this.test())
                this.setTimeout(function() { this.doQuad(x,y,w,h,level+1); }.bind(this),this.randomInt(500));
            // ne
            if (this.test())
                this.setTimeout(function() { this.doQuad(x+w,y,w,h,level+1); }.bind(this),this.randomInt(500));
            // sw
            if (this.test())
                this.setTimeout(function() { this.doQuad(x,y+h,w,h,level+1); }.bind(this),this.randomInt(500));
            // se
            if (this.test())
                this.setTimeout(function() { this.doQuad(x+w,y+h,w,h,level+1); }.bind(this),this.randomInt(500));
        }
    },

});
