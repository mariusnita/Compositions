function Composition16(ctx) {
    Composition.call(this, ctx);
}

Composition16.prototype = clone(Composition.prototype);

Composition16.prototype.setup = function() {
    this.counter = 0;
    this.pulses = 0;
    this.red = 242;
    this.green = 90;
    this.blue = 70;
    this.pr = 0;
    this.pg = 0;
    this.pb = 0;
};

Composition16.prototype.runFunc = function(white, black) {
    var startColor = white;
    var color = white;

    function nextColor() {
        color = color === black ? white : black;
        return color;
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
        var r = Math.random() * 2;

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

    this.blank();
    //for (var i = 0; i < 1000; ++i)
        disturbPoints();

    this.rects.forEach(function(rect) {
        var c = nextColor();
        console.log(c);

        var oldC = this.ctx.fillStyle;
        this.ctx.fillStyle = c;
        this.ctx.beginPath();

        this.ctx.lineTo(rect.p4.x, rect.p4.y);
        this.ctx.moveTo(rect.p1.x, rect.p1.y);
        this.ctx.lineTo(rect.p3.x, rect.p3.y);
        this.ctx.lineTo(rect.p2.x, rect.p2.y);

        
        this.ctx.fill();
        this.ctx.fillStyle = oldC;
    }.bind(this));
};

Composition16.prototype.mixColor = function(i,j,k,itup) {
    //return 'rgb(' + i + ',' + j + ',' + k + ')';
    return 'rgb(' + k + ',' + k + ',' + ((k*k)% itup) + ')';
    //return 'rgb(255,255,255)';
};

Composition16.prototype.doNext = function() {
    this.runFunc('#bbb','#985');
    this.setTimeout(this.objectExpr() + '.doNext()', 100);
};

Composition16.prototype.computeGrid = function() {
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

Composition16.prototype.run = function() {
    this.setup();
    this.blank('#000');
    this.computeGrid();
    this.computeColors(100,101,1);
    
    this.doNext();
};
