var Main = {};

Main.files = ['4','5','6','7','11','12', '13','14'];

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
    document.body.appendChild(fileref);
};

Main.getContext = function() { 
    return document.getElementById("myCanvas").getContext("2d"); 
};

Main.objs = {};
Main.exclusive = true;

Main.run = function(x) {
    var key = 'Composition'+x;

    if (typeof Main.objs[key] == 'undefined') {
        var comp = window[key];
        var t = new window[key](Main.getContext());
        Main.objs['Composition' + x] = t;
    }

    if (Main.exclusive) {
        var vals = Main.values(Main.objs);        
        for (var y = 0; y < vals.length; ++y) { 
            if (typeof vals[y] == 'object') {
                vals[y].stop();
            }
        }
    }

    Main.objs['Composition' + x].run();
};

Main.setExclusive = function(t) {
    Main.exclusive = t;
};

Main.ready = function() {
    var html = [];
    for (var x = 0; x < Main.files.length; ++x) {
        Main.loadJs('Composition' + Main.files[x] + '.js');
        html.push('<a onclick="Main.run(' + Main.files[x] + ');">' + (x+1) + '</a>');
    }
    $('#tests').html(html.join("&nbsp;&nbsp;"));
};
