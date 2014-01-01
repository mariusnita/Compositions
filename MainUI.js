$(document).ready(function() {
    var hidden = true;

    function cshow() { $('.control').css('top', -20); hidden = false; }
    function chide() { $('.control').css('top',  - 8 - $('.control').height()); hidden = true; }

    function resize() {
        $('#myCanvas')
            .attr('width',$(window).width())
            .attr('height',$(window).height());
    }

    $('.control')
        .mouseover(cshow)
        .mouseout(chide)
        .click(function() { 
            if (hidden) { 
                cshow(); 
            }
            else { 
                chide(); 
            } 
        });

    resize();

    var html = [];

    _.each(CompositionRunner.files, function(file) {
        CompositionRunner.loadJs('comps/Composition{0}.js'.format(file));
        html.push('<div class="but" onclick="CompositionRunner.run({0});">{0}</div>'.format(file));
    });

    $('#tests').html(html.join(""));

    setTimeout('CompositionRunner.run(24)',1000);

    cshow();
});
