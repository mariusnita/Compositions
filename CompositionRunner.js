var CompositionRunner = {
    files : _.difference(_.range(1, 29 + 1), [1,2,8,9,10,22]),
    objs : {},
    exclusive : true,

    loadJs : function(filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
        document.head.appendChild(fileref);
    },

    getCanvas : function() {
        var canvas = document.getElementById("myCanvas");
        return canvas;
    },


    run : function(x) {
        var key = 'Composition'+x;

        if (typeof this.objs[key] == 'undefined') {
            var comp = window[key];
            var t = new window[key](this.getCanvas());
            this.objs[key] = t;
        }

        if (this.exclusive) {
            this.stopAll();
        }

        this.objs[key].run();
    },

    stopAll : function() {
        _.each(_.values(this.objs), function(val) {
            if (typeof val === 'object') {
                val.stop();
            }
        });
    },

    setExclusive : function(t) {
        this.exclusive = t;
    }
};
