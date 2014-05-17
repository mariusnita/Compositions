"use strict";

/* Simple representation of a polygon. Just a list of {x,y} points. The polygon
   edges are assumed to be drawn in order of the points. */

function Polygon() {
    this.points = [];
}

Polygon.prototype = {
    addPoint: function(p) {
        this.points.push(p);
    },

    /* Return polygon lines/edges. */
    getLines: function() {
        if (this.points.length < 2) {
            /* If single point, there are no edges */
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

        /* Last edge connects the last point to the first. */
        if (this.points.length > 2) {
            lines.push({
                p1: prevPoint,
                p2: this.points[0]
            });
        }

        return lines;
    },

    /* Given (a pointer to) a point P, it creates a copy of it, inserts the
       copy before P and returns the copy. */
    duplicatePoint: function(p) {
        var idx = _.indexOf(this.points, p);

        if (idx < 0) {
            return;
        }

        var pointCopy = _.extend({}, p);
        this.points.splice(idx, 0, pointCopy);

        return pointCopy;
    },

    /* Gets the rectangle that bounds the polygon tightly. */
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
