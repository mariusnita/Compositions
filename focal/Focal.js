function Focal(ctx) {
    Composition.call(this, ctx);
    this.opts = {};
    this.bwCurColor = '#222';
    this.mouseIn = false;
    this.started = false;
}

Focal.prototype = clone(Composition.prototype);

Focal.prototype.runFunc = function(pt) {
    var m = this.mouse;

    if (this.opts.flyToTheLight && this.mouseIn && this.opts.mouse) {
        var distx = Math.abs(pt.x-m.x);
        var disty = Math.abs(pt.y-m.y);

        if (distx > 1) {
            if (pt.x > m.x)
                pt.x--;
            else
                pt.x++;
        }
        if (disty > 1) {
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


    if (this.mouseIn && this.opts.mouse) {
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

    this.drawPoint(pt.x,pt.y,pt.color);

    if (this.opts.bound) {
        this.theMan.forEach(function(m) {
            this.drawLine(pt.x,pt.y,m.x,m.y,pt.color);
        }.bind(this));
    }
};

Focal.prototype.doNext = function() {
    this.points.forEach(function(p) {
        this.runFunc(p);
    }.bind(this));

    this.setTimeout(function() {
        this.doNext();
    }.bind(this));
};

Focal.prototype.bwColor = function() {
    this.bwCurColor = this.bwCurColor === '#222' ? '#eee' : '#222';
    return this.bwCurColor;
};

Focal.prototype.setOpts = function(opts) {
    this.points.forEach(function(p) {
        p.color = opts.cols === true ? this.getColor() : this.bwColor();
    }.bind(this));
    this.opts = opts;
};

Focal.prototype.init = function() {
    this.started = true;

    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.points = [];

    this.theMan = [];

    for (var i = 0; i < this.w; i += 80) {
        for (var j = 0; j < this.h; j += 80) {
            var x = this.opts.distrib ? i : Math.floor(this.w/2);
            var y = this.opts.distrib ? j : Math.floor(this.h/2);
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

Focal.prototype.run = function() {
    if (!this.started)
        this.init();
    this.doNext();
};
