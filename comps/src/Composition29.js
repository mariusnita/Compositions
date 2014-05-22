'use strict';

function Composition29(ctx) {
    Composition.call(this, ctx);
}

Composition29.prototype = _.extend(clone(Composition.prototype), {
    run : function() {
        var horizLines = [],
            vertLines = [];

        this.lineWidth = 20,
        this.padding = 2;

        this.vertColor = '#666';
        this.horizColor = '#ccc';

        var width = this.width/2,
            height = this.height/2,
            numVert = Math.floor(this.width / this.lineWidth),
            numHoriz = Math.floor(this.height / this.lineWidth);

        this.dir = 0;
        this.cidx = 0;
        this.fcolors = Gradient.gradient('#999','#eee', 20);

        _.each(_.range(0, numHoriz/2), function(n) {
            horizLines.push(['horiz', n]);
            horizLines.push(['horiz', numHoriz-n]);
        }.bind(this));

        _.each(_.range(0, numVert/2), function(n) {
            vertLines.push(['vert', n]);
            vertLines.push(['vert', numVert-n]);
        }.bind(this));

        this.order = [];

        while (horizLines.length > 0 || vertLines.length > 0) {
            var arr;

            if (horizLines.length === 0) {
                arr = vertLines;
            } else if (vertLines.length === 0) {
                arr = horizLines;
            } else {
                arr = Math.random() > (this.height / this.width) ? horizLines : vertLines;
            }

            var id = this.randomInt(arr.length);
            if (id % 2 !== 0)
                id = this.flipCoin() ? id-1 : id+1;
            if (id < 0)
                id = 0;
            if (id >= arr.length)
                id = arr.length-2;

            var lines = arr.splice(id, 2);

            this.order.push(lines[0]);
            this.order.push(lines[1]);
        }

        this.blank('#ddd');
        this.runFunc(0);
    },

    nc: function() {
        if (this.cidx < 0) {
            this.cidx = 1;
            this.dir = 0;
        } else if (this.cidx === this.fcolors.length) {
            this.cidx = this.fcolors.length-2;
            this.dir = 1;
        }

        if (this.dir === 0)
            return this.fcolors[this.cidx++];
        else
            return this.fcolors[this.cidx--];
    },

    runFunc: function(i) {
        var line = this.order[i];

        if (!line) {
            console.log(i, this.order);
            throw new Error();
        }
        var p = this.padding;
        var c = this.nc();
        if (!c) {
            console.log(this.cidx);
            throw new Error();
        }
        if (line[0] === 'horiz') {
            this.fillRect(p, line[1] * this.lineWidth + p, this.width - p, this.lineWidth - p, c);
        } else {
            this.fillRect(line[1] * this.lineWidth + p, p, this.lineWidth - p, this.height - p, c);
        }

        this.setTimeout(function() {
            if (this.order.length > i+1)
                this.runFunc(i+1);
        }.bind(this), 50);
    }
});
