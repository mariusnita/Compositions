'use strict';

function Composition(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.objectName = Composition.nextObjectName();
    this.colors = null; //['#fff','#aaa','#333','#bbb'];
    this.idx = 0;
    this.timeouts = [];
    this.events = [];
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
};

Composition.prototype = {
    objectExpr : function() {
        return "Composition.objects['" + this.objectName + "']";  
    },

    getColor : function() {
        var col = this.colors[this.idx++];
        if (this.idx == this.colors.length) { 
            this.idx = 0;
            this.colors.reverse();
        }
        return col;
    },

    setColors : function(cols) {
        this.colors = cols;
        this.idx = 0;
    },

    computeColors : function(itdown, itup, step) {
        var colors = [];
        for (var i = itdown; i <= itup; i += step) {
            for (var j = itdown; j <= itup; j += step) {
                for (var k = itdown; k <= itup; k += step) {
                    colors.push(this.mixColor(i,j,k,itup));
                }
            }
        }
        this.colors = colors;
    },

    mixColor : function(i,j,k,itup) {
        return 'rgb(' + k + ',' + i + ',' + ((k*k)% itup) + ')';
    },

    computeColorsDefault : function() {
        this.computeColors(0,255,10);
    },

    getColorOrDefault : function(color) {
        if (typeof color == 'undefined') {
            return this.getColor();
        }
        return color;
    },

    randomColor : function() {
        var idx = Math.random() * this.colors.length;
        return this.colors[Math.floor(idx)];
    },

    blank : function(color) {
        if (typeof color == 'undefined') {
            color = '#111111';
        }
        this.ctx.fillStyle=color;
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);    
    },

    each : function(f) {
        for (var x = 0; x < this.ctx.canvas.width; ++x) {
            for (var y = 0; y < this.ctx.canvas.height; ++y) {
                f(x,y);
            }
        }
    },

    drawLine : function(x1,y1,x2,y2,color,width) {
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
    },

    drawPoint : function(x,y,color) {
        this.fillRect(x,y,1,1,color);
    },

    fillRect : function(x1, y1, x2, y2, color) {
        color = this.getColorOrDefault(color);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x1,y1,x2,y2);
    },

    strokeRect : function(x1, y1, x2, y2, color) {
        color = this.getColorOrDefault(color);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x1,y1,x2,y2);
    },


    circle : function(x,y,size) {
        this.ctx.beginPath();
        this.ctx.arc(x,y,size,0,Math.PI*2,true);
        this.ctx.closePath();
    },

    fillCircle : function(x,y,size,color) {
        color = this.getColorOrDefault(color);    
        this.ctx.fillStyle=color;
        this.circle(x,y,size);
        this.ctx.fill();
    },

    strokeCircle : function(x,y,size,width,color) {
        color = this.getColorOrDefault(color);    
        this.ctx.strokeStyle=color;
        this.ctx.lineWidth = width;
        this.circle(x,y,size);
        this.ctx.stroke();
    },

    setTimeout : function(func, time) {
        var t = setTimeout(func, time);
        this.timeouts.push(t);
    },

    flipCoin : function() {
        return Math.floor(Math.random() * 2);
    },

    randomPoint : function() {
        return {
            x : this.randomInt(this.width),
            y : this.randomInt(this.height)
        };
    },

    randomInt : function(i) {
        return Math.floor(Math.random() * i);
    },

    getMousePos : function(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },

    addEventListener : function(eventName, callback) {
        this.canvas.addEventListener(eventName, callback);
        this.events.push({ name: eventName, callback: callback });
    },

    listenToMouse : function(f) {
        this.addEventListener('mousemove', function(evt) {
            var mousePos = this.getMousePos(evt);
            f(mousePos);
        }.bind(this), false);
    },

    run : function() {
        console.log('Run method needs to be overridden.');
    },

    stop : function() {
        for (var x = 0; x < this.timeouts.length; ++x) {
            clearTimeout(this.timeouts[x]);
        }

        for (x = 0; x < this.events.length; ++x) {
            this.canvas.removeEventListener(this.events[x].name, this.events[x].callback);
        }

        this.stopped = true;
        this.idx = 0;
        this.timeouts = [];
        this.events = [];
    }
};
