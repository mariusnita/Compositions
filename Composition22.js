function Composition22(ctx) {
    Composition.call(this, ctx);
    this.opts = {};
    this.bwCurColor = '#000';
    this.mouseIn = false;
}

Composition22.prototype = clone(Composition.prototype);

Composition22.prototype.runFunc = function(pt) {
    var m = this.mouse;

    if (this.opts.flyToTheLight && this.mouseIn) {
        var distx = Math.abs(pt.x-m.x);
        var disty = Math.abs(pt.y-m.y);

        if (distx > disty) {
            if (pt.x > m.x)
                pt.x--;
            else
                pt.x++;
        } else {
            if (pt.y > m.y)
                pt.y--;
            else
                pt.y++;
        }
    }

    if (Math.floor(Math.random() * 20) == 10) {
        if (pt.dir === 0 || pt.dir === 1) {
            pt.dir = Math.floor(Math.random() * 2) + 2;
        } else if (pt.dir === 2 || pt.dir === 3) {
            pt.dir = Math.floor(Math.random() * 2);
        }
    }

    //this.strokeRect(pt.x,pt.y,5,5,pt.color);

    if (pt.dir === 0) {
        pt.y --;
    }
    else if (pt.dir === 1) {
        pt.y ++;
    } 
    else if (pt.dir === 2) {
        pt.x ++;
    }
    else if (pt.dir === 3) {
        pt.x --;
    }


    if (this.mouseIn) {
        this.drawLine(pt.x,pt.y,m.x,m.y,pt.color);
    }

    if (pt.x === 0)
        pt.x = this.w - 1;
    else if (pt.x === this.w-1)
        pt.x = 0;
    if (pt.y === 0)
        pt.y = this.h-1;
    else if (pt.y === this.h-1)
        pt.y = 0;

    //this.fillRect(pt.x,pt.y,5,5,pt.color);
    this.drawPoint(pt.x,pt.y,pt.color);

    if (this.opts.bound) {
        this.theMan.forEach(function(m) {
            this.drawLine(pt.x,pt.y,m.x,m.y,pt.color);
        }.bind(this));
    }
};

Composition22.prototype.doNext = function() {
    this.points.forEach(function(p) {
        this.runFunc(p);
    }.bind(this));
    this.setTimeout(this.objectExpr() + '.doNext()');
};

Composition22.prototype.bwColor = function() {
    this.bwCurColor = this.bwCurColor === '#000' ? '#fff' : '#000';
    return this.bwCurColor;
};

Composition22.prototype.setOpts = function(opts) {
    this.points.forEach(function(p) {
        p.color = opts.cols === true ? this.getColor() : this.bwColor();
    }.bind(this));
    this.opts = opts;
};

Composition22.prototype.init = function() {
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.points = [];

    this.theMan = [];

    for (var i = 0; i < this.w; i += 80) {
        for (var j = 0; j < this.h; j += 80) {
            var x = this.opts.distrib ? i : this.w/2;
            var y = this.opts.distrib ? j : this.h/2;
            var colr = this.opts.cols ? this.getColor() : this.bwColor();

            var p = {
                dir : 0,
                x : x,
                y : y,
                color : colr
            };
            this.points.push(p);
            if (Math.floor(Math.random()*50) === 25)
                this.theMan.push(p);
        }   
    }

    this.listenToMouse(function(mp) {
        this.mouse = mp;
    }.bind(this));

    this.canvas.addEventListener('mouseover',function() {
        this.mouseIn = true;
    }.bind(this));

    this.canvas.addEventListener('mouseout',function() {
        this.mouseIn = false;
    }.bind(this));

    this.canvas.addEventListener('keydown',function() {
        this.mouseIn = false;
    }.bind(this),false);

    this.blank('#000');
};

Composition22.prototype.run = function() {
    if (typeof (this.points) === 'undefined') {
        this.init();
    }
    this.doNext();
};
