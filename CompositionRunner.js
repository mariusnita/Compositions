var CompositionRunner = {};

CompositionRunner.files = _.difference(_.range(1,26), [1,2,8,9,10,22]);

CompositionRunner.loadJs = function(filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", filename);
    document.head.appendChild(fileref);
};

CompositionRunner.getCanvas = function() { 
    var canvas = document.getElementById("myCanvas");
    return canvas;
};

CompositionRunner.objs = {};
CompositionRunner.exclusive = true;

CompositionRunner.run = function(x) {
    var key = 'Composition'+x;

    if (typeof CompositionRunner.objs[key] == 'undefined') {
        var comp = window[key];
        var t = new window[key](CompositionRunner.getCanvas());
        CompositionRunner.objs[key] = t;
    }

    if (CompositionRunner.exclusive) {
        CompositionRunner.stopAll();
    }

    CompositionRunner.objs[key].run();
};

CompositionRunner.stopAll = function() {
    _.each(_.values(CompositionRunner.objs), function(val) {
        if (typeof val === 'object') {
            val.stop();
        }
    });
};

CompositionRunner.setExclusive = function(t) {
    CompositionRunner.exclusive = t;
};
