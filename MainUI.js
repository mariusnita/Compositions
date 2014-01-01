var hidden = true;

function cshow() { 
    $('.control').css('top', -20); 
    hidden = false; 
}

function chide() { 
    $('.control').css('top',  - 8 - $('.control').height()); 
    hidden = true; 
}

function resize() {
    $('#myCanvas')
        .attr('width',$(window).width())
        .attr('height',$(window).height());
}

function initRunner() {
    var html = [];

    _.each(CompositionRunner.files, function(file) {
        CompositionRunner.loadJs('comps/Composition{0}.js'.format(file));
        html.push('<div class="but" onclick="CompositionRunner.run({0});">{0}</div>'.format(file));
    });

    $('#comps').html(html.join(""));
}

$(document).ready(function() {
    $('.control')
        .mouseover(cshow)
        .mouseout(chide)
        .click(function() { hidden ? cshow() : chide(); });

    initRunner();
    resize();
    cshow();

    /* run comp 24 by default */
    setTimeout('CompositionRunner.run(24)',1000);
});
