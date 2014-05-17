"use strict";

function Polygon() {
    this.points = [];
}

Polygon.prototype = {
    addPoint: function(p) {
        this.points.push(p);
    },
    getLines: function() {
        if (this.points.length < 2) {
            return [];
        }
        var lines = [];
        var prevPoint = this.points[0];
        for (var x = 1; x < this.points.length; ++x) {
            lines.push({
                p1: prevPoint,
                p2: this.points[x]
            });
            prevPoint = this.points[x];
        }
        if (this.points.length > 2) {
            lines.push({
                p1: prevPoint,
                p2: this.points[0]
            });
        }
        return lines;
    },
    duplicatePoint: function(p) {
        var idx = _.indexOf(this.points, p);
        if (idx < 0) {
            console.log('bad point');
            return;
        }
        var pointCopy = _.extend({}, p);
        this.points.splice(idx, 0, pointCopy);
        return pointCopy;
    },
    getBounds: function() {
        var minX = 10000000, maxX = -10000000,
            minY = 10000000, maxY = -10000000;
        _.each(this.points, function(p) {
            if (p.x < minX)
                minX = p.x;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.y > maxY)
                maxY = p.y;
        });
        return {
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY
        };
    }
};
