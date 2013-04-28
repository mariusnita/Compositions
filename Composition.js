function clone(obj) {
    if (typeof obj !== 'undefined') {
	clone.prototype = Object(obj);
	return new clone;
    }
}

function Composition(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.objectName = Composition.nextObjectName();
    this.colors = null; //['#fff','#aaa','#333','#bbb'];
    this.idx = 0;
    this.timeouts = [];
    Composition.objects[this.objectName] = this;
    this.computeColorsDefault();
    this.stopped = true;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
}

Composition.objects = {};
Composition.prefix = "_obj";
Composition.index = 0;
Composition.nextObjectName = function(){
    return Composition.prefix + (Composition.index++);
}

Composition.prototype.getColor = function() {
    var col = this.colors[this.idx++];
    if (this.idx == this.colors.length) { 
        this.idx = 0;
        this.colors.reverse();
    }
    return col;
};

Composition.prototype.setColors = function(cols) {
    this.colors = cols;
    this.idx = 0;
};

Composition.prototype.computeColors = function(itdown, itup, step) {
    var colors = [];
    for (var i = itdown; i <= itup; i += step) {
        for (var j = itdown; j <= itup; j += step) {
            for (var k = itdown; k <= itup; k += step) {
                colors.push(this.mixColor(i,j,k,itup));
            }
        }
    }
    this.colors = colors;
};

Composition.prototype.mixColor = function(i,j,k,itup) {
    return 'rgb(' + k + ',' + i + ',' + ((k*k)% itup) + ')';
};

Composition.prototype.computeColorsDefault = function() {
    this.computeColors(0,255,10);
};

Composition.prototype.objectExpr = function() {
    return "Composition.objects['" + this.objectName + "']";  
};

Composition.prototype.blank = function(color) {
    if (typeof color == 'undefined') {
        color = '#111111';
    }
    this.ctx.fillStyle=color;
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);    
};

Composition.prototype.setEndCallback = function(f) {
    this.endCallback = f;
};

Composition.prototype.end = function() {
    if (typeof this.endCallback == 'function') {
        this.endCallback();
    }
};

Composition.prototype.drawLine = function(x1,y1,x2,y2,color,width) {
    if (typeof color == 'undefined') {
        color = this.getColor();
    }


    if (typeof width === 'undefined') {
        width = 1;
    }

    var oldC = this.ctx.strokeStyle;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.stroke();
    this.ctx.strokeStyle = oldC;
};

Composition.prototype.drawPoint = function(x,y,color) {
    this.fillRect(x,y,1,1,color);
};

Composition.prototype.fillRect = function(x1, y1, x2, y2, color) {
    color = this.getColorOrDefault(color);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x1,y1,x2,y2);
};

Composition.prototype.strokeRect = function(x1, y1, x2, y2, color) {
    color = this.getColorOrDefault(color);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x1,y1,x2,y2);
};

Composition.prototype.getColorOrDefault = function(color) {
    if (typeof color == 'undefined') {
        return this.getColor();
    }
    return color;
};

Composition.prototype.circle = function(x,y,size,color) {
    this.ctx.beginPath();
    this.ctx.arc(x,y,size,0,Math.PI*2,true);
    this.ctx.closePath();
};

Composition.prototype.fillCircle = function(x,y,size,color) {
    color = this.getColorOrDefault(color);    
    this.ctx.fillStyle=color;
    this.circle(x,y,size,color);
    this.ctx.fill();
};

Composition.prototype.randomColor = function() {
    var idx = Math.random() * this.colors.length;
    return this.colors[Math.floor(idx)];
};

// deprecated
Composition.prototype.drawCircle = Composition.prototype.fillCircle;

Composition.prototype.strokeCircle = function(x,y,size,width,color) {
    color = this.getColorOrDefault(color);    
    this.ctx.strokeStyle=color;
    this.ctx.lineWidth = width;
    this.circle(x,y,size,color,true);
    this.ctx.stroke();
};

Composition.prototype.stop = function() {
    for (var x = 0; x < this.timeouts.length; ++x) {
        clearTimeout(this.timeouts[x]);
    }
    this.stopped = true;
    this.idx = 0;
    this.timeouts = [];
};

Composition.prototype.setTimeout = function(func, time) {
    var t = setTimeout(func, time);
    this.timeouts.push(t);
};

Composition.seq = function (ts) {
    if (ts.length == 0)
        return;
    if (ts.length > 1) {
        for (var x = 0; x < ts.length-1; ++x) {
            var y = x+1;
            ts[x].setEndCallback(function(){ ts[y].run(); });
        }
    }
    ts[0].run();
};

Composition.prototype.getMousePos = function(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

Composition.prototype.listenToMouse = function(f) {
    this.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = this.getMousePos(evt);
        f(mousePos);
    }.bind(this), false);
};

Composition.prototype.each = function(f) {
    for (var x = 0; x < this.ctx.canvas.width; ++x) {
        for (var y = 0; y < this.ctx.canvas.height; ++y) {
            f(x,y);
        }
    }
};

