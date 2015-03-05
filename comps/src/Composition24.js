(function(extend, Composition) {
  function Composition24(ctx) {
    Composition.call(this, ctx);
  }

  Composition24.prototype = extend(Composition, {
    perturbPoint: function(p) {
      var rx = Math.random()/5;
      var ry = Math.random()/5;

      if (p.x > this.width/2) {
        p.flipX = true;
      }
      if (p.x < this.width/2) {
        p.flipX = false;
      }

      if (p.y > this.height/2) {
        p.flipY = true;
      }
      if (p.y < this.height/2) {
        p.flipY = false;
      }

      //console.log(this.flipX, this.flipY);
      
      if (!p.flipX) {
        p.momentumX += rx;
      } else {
        p.momentumX -= rx;
      }

      if (!p.flipY) {
        p.momentumY += ry;
      } else {
        p.momentumY -= ry;
      }

      p.x += p.momentumX;
      p.y += p.momentumY;
    },
    runFunc: function(p) {
      this.perturbPoint(p);
      this.drawLine(p.x,p.y,p.x + p.momentumX,p.y + p.momentumY,"black",2);
      this.setTimeout(function() {
        this.runFunc(p);
      }.bind(this));
    },
    run: function() {
      this.blank("white");
      var p = {
        x: Math.random()*this.width,
        y: Math.random()*this.height,
        momentumX: 1,
        momentumY: 1,
        flipX: false,
        flipY: false
      };
      this.runFunc(p);
    }
  });
  window.Composition24 = Composition24;
})(window.extend, window.Composition);
