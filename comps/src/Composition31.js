(function(_, clone, extend, Composition, Composition24) {
  "use strict";

  function Composition31(ctx) {
    Composition.call(this, ctx);
  }

  Composition31.prototype = extend(Composition, {
    run: function() {
      this.blank("white");
      var points = this.makePoints(8);
      var imageData = this.ctx.getImageData(0, 0, this.width, this.height);
      this.step(points, imageData);
    },
    movePoints: function(points) {
      for (var i = 0; i < points.length; ++i) {
        Composition24.prototype.perturbPoint.call(this, points[i]);
      }
    },
    step: function(points, imageData) {
      for (var i = 0; i < this.width; ++i) {
        for (var j = 0; j < this.height; ++j) {
          var closest = this.closestPoint(points, i, j);
          var idx = (j * this.width + i) * 4;
          var color = closest.color;
          imageData.data[idx] = color[0];
          imageData.data[idx+1] = color[1];
          imageData.data[idx+2] = color[2];
        }
      }
      this.ctx.putImageData(imageData, 0, 0);
      // points.forEach(function(p) {
      //   this.fillCircle(p.x, p.y, 4, "white");
      // }.bind(this));
      this.movePoints(points);
      this.setTimeout(function() {
        this.step(points, imageData);
      }.bind(this));
    },
    makePoints: function(n) {
      var points = [];
      for (var i = 0; i < n; ++i) {
        points.push({
          x: Math.round(Math.random() * this.width),
          y: Math.round(Math.random() * this.height),
          flipX: false,
          flipY: false,
          momentumX: 1,
          momentumY: 1,
          color: this.randomColor()
        });
      }
      return points;
    },
    randomColor: function() {
      var r = this.randomInt(255),
          g = this.randomInt(255),
          b = this.randomInt(255);
      return [r,g,b];
    },
    closestPoint: function(points, x, y) {
      var closest = points[0];
      var p = {x: x, y: y};
      for (var i = 1; i < points.length; ++i) {
        if (this.distance(p, points[i]) < this.distance(p, closest)) {
          closest = points[i];
        }
      }
      return closest;
    }
  });
  window.Composition31 = Composition31;
})(window._, window.clone, window.extend, window.Composition, window.Composition24);
