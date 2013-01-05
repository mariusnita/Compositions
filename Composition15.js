function Composition15(ctx) {
    Composition.call(this, ctx);
}

Composition15.prototype = clone(Composition.prototype);

Composition15.prototype.setup = function() {
    this.counter = 0;
    this.pulses = 0;
    this.red = 242;
    this.green = 90;
    this.blue = 70;
    this.pr = 0;
    this.pg = 0;
    this.pb = 0;
};

Composition15.prototype.runFunc = function(white, black) {
    var startColor = white;
    var color = white;

    function nextColor() {
        color = color === black ? white : black;
    }

    function nextStartColor() {
        startColor = startColor === black ? white : black;
        color = startColor;
        return startColor;
    }

    function flip() {
        return Math.floor(Math.random() * 2);
    }

    function setP(p) {
        var r = Math.random() ;

        if (flip()) {
            p.x = p.x + r;
        } else {
            p.x = p.x - r;
        }

        if (flip()) {
            p.y = p.y - r;
        } else {
            p.y = p.y + r;
        }
    }

    var disturbPoints = function () {
        this.rects.forEach(function(rect) {
            setP(rect.p1);
            setP(rect.p2);
        }.bind(this));
    }.bind(this);

    disturbPoints();

    if (this.pulses < 10) {
        this.blank('rgba(30,50,60,0.1)');
    } else if (this.pulses < 20) {
        this.blank('rgba(100,100,100,0.01)');
    } else if (this.pulses < 30) {
        this.blank('rgba(' + this.pr + ',' + this.pg + ',' + this.pb + ',0.4)');
        this.pr += 20;
        this.pg += 20;
        this.pb += 20;
    }
    //this.blank('rgba(242,90,70,0.01)');


    this.rects.forEach(function(rect) {
        var c = this.getColor();

        // var red = 'blue';

        // this.fillCircle(rect.p1.x, rect.p1.y, 1, red);
        // this.fillCircle(rect.p2.x, rect.p2.y, 1, red);
        // this.fillCircle(rect.p3.x, rect.p3.y, 1, red);
        // this.fillCircle(rect.p4.x, rect.p4.y, 1, red);

        //this.drawLine(rect.p1.x, rect.p1.y, rect.p2.x, rect.p2.y, 'rgb(20,20,20)');
        //this.drawLine(rect.p3.x, rect.p3.y, rect.p4.x, rect.p4.y, 'rgb(20,20,20)');
        function makeCol(r,g,b) { 
            return 'rgb(' + r + ',' + g + ',' + b + ')'; 
        }

        if (this.counter++ < 40000) {
            this.drawLine(rect.p1.x, rect.p1.y, rect.p2.x, rect.p2.y, makeCol(this.red, this.green, this.blue));
        } else if (this.counter < 80000) {
            this.drawLine(rect.p3.x, rect.p3.y, rect.p4.x, rect.p4.y, makeCol(this.red, this.green, this.blue));
        } else {
            this.counter = 0;
            this.pulses ++;
            this.red-=20;
            if (this.blue > this.red)
                this.blue = this.red;
            if (this.green > this.red)
                this.green = this.red;
        }

        // this.drawLine(rect.p3.x, rect.p3.y, rect.p4.x, rect.p4.y, 'rgba(80,80,80,0.4)');

        //this.ctx.fillStyle = 'rgba(81,158,181,0.2)';

        //this.fillRect(rect.p1.x, rect.p1.y, rect.p2.x, rect.p2.y, 'rgba(80,80,80,0.4)');

    }.bind(this));
};

Composition15.prototype.mixColor = function(i,j,k,itup) {
    //return 'rgb(' + i + ',' + j + ',' + k + ')';
    return 'rgb(' + k + ',' + k + ',' + ((k*k)% itup) + ')';
    //return 'rgb(255,255,255)';
};

Composition15.prototype.doNext = function() {
    this.runFunc(this.getColor(),this.getColor());
    this.setTimeout(this.objectExpr() + '.doNext()', 100);
};

Composition15.prototype.computeGrid = function() {
    var decisionFuncX = function(x, len) {
        var w = len;
        //return Math.ceil(Math.random() * 800) % 100 < Math.sqrt(x) ;

        if (x > w/2)
            x = w - x;

        // if (x > w/4 + 10 && x <= w/2 + 10)
        //     x = w / 2 - x;

        // if (x > w/2 + 10 && x <= w * (1/2 + 1/4) + 10)
        //     x = x - w / 2;

        var s = Math.sqrt(x);
        return Math.floor(s) == s;
    }.bind(this);

    var lastX = -1, lastY = -1;

    var pointCache = [];
    function getPoint(x,y) {
        for (var i = 0; i < pointCache.length; ++i) {
            if (pointCache[i].x === x && pointCache[i].y === y) {
                return pointCache[i];
            }
        }
        var p = { x : x, y : y };
        pointCache.push(p);
        return p;
    }

    this.rects = [];
    
    for (var x = 0; x < this.ctx.canvas.width; ++x) {
        if (decisionFuncX(x, this.ctx.canvas.width)) {
            for (var y = 0; y < this.ctx.canvas.height; ++y) {
                if (decisionFuncX(y, this.ctx.canvas.height)) {
                    if (lastX >= 0 && lastY >= 0 && y >= lastY) {
                        this.rects.push({
                            p1 : getPoint(lastX, lastY),
                            p2 : getPoint(x, y),
                            p3 : getPoint(lastX, y),
                            p4 : getPoint(x, lastY)
                        });
                    }
                    lastY = y;
                }
            }
            lastX = x;
        }
    }
    
};

Composition15.prototype.doCircle = function(x) {
    var xcenter = this.ctx.canvas.width / 2;
    var ycenter = this.ctx.canvas.height / 2;
    
    var radgrad4 = this.ctx.createRadialGradient(xcenter,ycenter,1,xcenter,ycenter,x);
    radgrad4.addColorStop(0, 'white');
    radgrad4.addColorStop(1, 'black');

    this.fillCircle(xcenter,ycenter, x, radgrad4);

    this.rects.forEach(function(rect) {
        this.fillCircle(rect.p1.x, rect.p1.y, 1, 'blue');
    }.bind(this));
};

Composition15.prototype.runCircle = function(max) {
    for (var x = 1; x <= max; ++x) {
        setTimeout(this.objectExpr() + '.doCircle(' + x + ')', 10 * x * (Math.sqrt(x/100)));
    }
};

Composition15.prototype.run = function() {
    this.setup();
    this.blank('#000');
    this.computeGrid();
    this.computeColors(100,101,1);
    
    var w = this.ctx.canvas.width;
    var h = this.ctx.canvas.height;

    var max = w < h ? w/2 : h/2;

    this.rects.forEach(function(rect) {
        this.fillCircle(rect.p1.x, rect.p1.y, 1, 'blue');
    }.bind(this));

    setTimeout(function() { this.runCircle(max); }.bind(this), 3000);

    setTimeout(function() { this.doNext(); }.bind(this), (10 * max * 2) + 6000);
};
