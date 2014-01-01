var Main = {};

//Main.files = ['4','5','6','7','11','12', '13','14','15','16','17','18','19','20','21','22','23','24','25'];

Main.files = _.difference(_.range(1,26), [1,2,8,9,10,22]);

Main.keys = function(obj) {
    var keys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
};

Main.values = function (obj) {
    var vals = [];
    var keys = Main.keys(obj);

    for (var x = 0; x < keys.length; ++x) {
        vals.push(obj[keys[x]]);
    }

    return vals;
};

Main.loadJs = function(filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", filename);
    document.head.appendChild(fileref);
};

Main.getCanvas = function() { 
    var canvas = document.getElementById("myCanvas");
    return canvas;
};

Main.objs = {};
Main.exclusive = true;

Main.run = function(x) {
    var key = 'Composition'+x;

    if (typeof Main.objs[key] == 'undefined') {
        var comp = window[key];
        var t = new window[key](Main.getCanvas());
        Main.objs[key] = t;
    }

    if (Main.exclusive) {
        Main.stopAll();
    }

    Main.objs[key].run();
};

Main.stopAll = function() {
    var vals = Main.values(Main.objs);        
    for (var y = 0; y < vals.length; ++y) { 
        if (typeof vals[y] == 'object') {
            vals[y].stop();
        }
    }
};

Main.setExclusive = function(t) {
    Main.exclusive = t;
};

Main.ready = function() {
    var html = [];
    for (var x = 0; x < Main.files.length; ++x) {
        Main.loadJs('Composition' + Main.files[x] + '.js');
        html.push('<div class="but" onclick="Main.run(' + Main.files[x] + ');">' + Main.files[x] + '</div>');
    }
    $('#tests').html(html.join(""));
};
