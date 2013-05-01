function Mondrian(ctx) {
    Composition.call(this, ctx);
    this.shapes = [];
    this.blank('white');
    this.save();
}

Mondrian.prototype = clone(Composition.prototype);

Mondrian.prototype.save = function() {
    this.imageData = this.ctx.getImageData(0,0,this.width,this.height);
};

Mondrian.prototype.restore = function() {
    this.ctx.putImageData(this.imageData, 0, 0);
};

Mondrian.prototype.run = function() {
    this.canvas.addEventListener('mouseout',function() {
        this.shape = null;
        this.restore();
    }.bind(this));

    this.listenToMouse(function(m) {
        this.restore();

        if (this.mode === 'vertical') {
            var ys = [];

            var my_mouse_x = m.x;
            if (m.x < 5)
                my_mouse_x = 5;
            if (m.x > this.width - 5)
                my_mouse_x = this.width - 5;

            this.shapes.forEach(function(shape) {
                if (shape.mode === 'horizontal' && shape.x1 <= my_mouse_x && shape.x2 > my_mouse_x && shape.y1 > 5 && shape.y1 < this.height - 5) {
                    ys.push(shape.y1);
                }
            }.bind(this));

            ys.push(this.height);

            ys.sort(function(x,y) { return x-y; });

            var possibilities = [];

            if (ys.length == 1) {
                possibilities = [{ x1: my_mouse_x, y1 : 0, x2 : my_mouse_x, y2 : this.height }];
            }
            else if (ys.length > 1) {
                ys.forEach(function(y) { 
                    if (y !== 0) {
                        possibilities.push({ x1 : my_mouse_x, y1 : 0, x2 : my_mouse_x, y2 : y });
                    }
                }.bind(this));

                ys.forEach(function(y) { 
                    if (y !== this.height) {
                        possibilities.push({ x1 : my_mouse_x, y1 : y, x2 : my_mouse_x, y2 : this.height });
                    }
                }.bind(this));
            }
            if (ys.length > 2) {
                var prev_y = 0;
                ys.forEach(function(y) {
                    if (prev_y != null) {
                        possibilities.push({ x1 : my_mouse_x, y1 : prev_y, x2 : my_mouse_x, y2 : y });
                    }
                    prev_y = y;
                });
            }

            var bucket_size = this.height / possibilities.length;
            var pos = Math.floor(m.y / bucket_size);

            var l = this.shape = {
                type: 'line', 
                mode: 'vertical',
                x1: possibilities[pos].x1, //m.x, 
                y1: possibilities[pos].y1, //0, 
                x2: possibilities[pos].x2, //m.x, 
                y2: possibilities[pos].y2, //this.height, 
                color: 'rgb(0,0,0)', 
                width: 10
            };
            this.drawLine(l.x1, l.y1, l.x2, l.y2, l.color, l.width);
        } else if (this.mode === 'horizontal') {
            var xs = [];

            var my_mouse_y = m.y;
            if (m.y < 5)
                my_mouse_y = 5;
            if (m.y > this.height - 5)
                my_mouse_y = this.height - 5;

            this.shapes.forEach(function(shape) {
                if (shape.mode === 'vertical' && shape.y1 <= my_mouse_y && shape.y2 > my_mouse_y && shape.x1 > 5 && shape.x1 < this.width - 5) {
                    xs.push(shape.x1);
                }
            }.bind(this));

            xs.push(this.width);

            xs.sort(function(x,y) { return x-y; });

            possibilities = [];

            if (xs.length === 1) {
                possibilities = [{ x1 : 0, y1 : my_mouse_y, x2 : this.width, y2 : my_mouse_y }];
            }
            else if (xs.length > 1) {
                xs.forEach(function(x) { 
                    if (x !== 0) {
                        possibilities.push({ x1 : 0, y1 : my_mouse_y, x2 : x, y2 : my_mouse_y });
                    }
                }.bind(this));

                xs.forEach(function(x) { 
                    if (x !== this.width) {
                        possibilities.push({ x1 : x, y1 : my_mouse_y, x2 : this.width, y2 : my_mouse_y });
                    }
                }.bind(this));
            }
            if (xs.length > 2) {
                var prev_x = 0;
                xs.forEach(function(x) {
                    possibilities.push({ x1 : prev_x, y1 : my_mouse_y, x2 : x, y2 : my_mouse_y });
                    prev_x = x;
                });
            }

            bucket_size = this.width / possibilities.length;
            pos = Math.floor(m.x / bucket_size);

            l = this.shape = {
                type: 'line', 
                mode: 'horizontal',
                x1: possibilities[pos].x1, //0, 
                y1: possibilities[pos].y1, //m.y, 
                x2: possibilities[pos].x2, //this.width, 
                y2: possibilities[pos].y1, //m.y, 
                color: 'rgb(0,0,0)', 
                width: 10
            };
            this.drawLine(l.x1, l.y1, l.x2, l.y2, l.color, l.width);
        } else if (this.mode === 'red' || this.mode === 'blue' || this.mode === 'yellow' || this.mode === 'white') {
            var top_x = 0,
                top_y = 0,
                bot_x = this.width,
                bot_y = this.height;
            
            var mouse_x = m.x;
            var mouse_y = m.y;

            if (mouse_x < 0)
                mouse_x = 0;
            if (mouse_y < 0)
                mouse_y = 0;

            this.shapes.forEach(function(shape) {
                if (shape.mode === 'vertical') {
                    if (shape.y1 <= mouse_y && shape.y2 > mouse_y) {
                        if (shape.x1 <= mouse_x && shape.x1 > top_x)
                            top_x = shape.x1+5;
                        if (shape.x1 > mouse_x && shape.x1 < bot_x)
                            bot_x = shape.x1-5;
                    }
                }
                if (shape.mode === 'horizontal') {
                    if (shape.x1 <= mouse_x && shape.x2 > mouse_x) {
                        if (shape.y1 <= mouse_y && shape.y1 > top_y) 
                            top_y = shape.y1+5;
                        if (shape.y1 > mouse_y && shape.y1 < bot_y)
                            bot_y = shape.y1-5;
                    }
                }
            }.bind(this));

            this.fillRect(top_x, top_y, bot_x-top_x, bot_y-top_y, this.mode);
        }
    }.bind(this));

    this.canvas.addEventListener('click',function() {
        if (this.shape)
            this.shapes.push(this.shape);
        this.save();
    }.bind(this));
};
