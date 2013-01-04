function Composition15(ctx) {
    Composition.call(this, ctx);
    this.counter = 0;
}

Composition15.prototype = clone(Composition.prototype);

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
        var r = Math.random();

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

    this.blank('rgba(80,80,80,0.05)');


    // var radgrad4 = this.ctx.createRadialGradient(0,150,50,0,140,90);
    // radgrad4.addColorStop(0, '#F4F201');
    // radgrad4.addColorStop(0.8, '#E4C700');
    // radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

    //this.fillCircle(400,400, 50, radgrad4);

    this.rects.forEach(function(rect) {
        var c = this.getColor();

        var red = 'blue';
        /*
        this.fillCircle(rect.p1.x, rect.p1.y, 2, red);
        this.fillCircle(rect.p2.x, rect.p2.y, 2, red);
        this.fillCircle(rect.p3.x, rect.p3.y, 2, red);
        this.fillCircle(rect.p4.x, rect.p4.y, 2, red);
         */
        this.drawLine(rect.p1.x, rect.p1.y, rect.p2.x, rect.p2.y, 'rgba(80,80,80,0.4');
        this.drawLine(rect.p3.x, rect.p3.y, rect.p4.x, rect.p4.y, 'rgba(80,80,80,0.4');

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
    var decisionFuncX = function(x) {
        var w = this.ctx.canvas.width;
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
        if (decisionFuncX(x)) {
            for (var y = 0; y < this.ctx.canvas.height; ++y) {
                if (decisionFuncX(y)) {
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
    var radgrad4 = this.ctx.createRadialGradient(400,400,1,400,400,x);
    radgrad4.addColorStop(0, 'white');
    radgrad4.addColorStop(1, 'black');
    //radgrad4.addColorStop(1, 'rgba(30,30,30,1)');
    this.fillCircle(400, 400, x, radgrad4);
};

Composition15.prototype.runCircle = function() {
    for (var x = 1; x <= 400; ++x) {
        setTimeout(this.objectExpr() + '.doCircle(' + x + ')', 10 * x * (Math.sqrt(x/100)));
    }
};

Composition15.prototype.run = function() {
    this.blank('#000');
    this.computeGrid();
    this.computeColors(100,101,1);
    
    // var radgrad4 = this.ctx.createRadialGradient(400,400,1,400,400,400);
    // radgrad4.addColorStop(0, 'white');
    // radgrad4.addColorStop(1, 'black');
    // //radgrad4.addColorStop(1, 'rgba(30,30,30,1)');

    // this.fillCircle(400, 400, 400, radgrad4);

    this.runCircle();

    setTimeout(function() { this.doNext(); }.bind(this), (10 * 400 * 2) + 3000);
};
