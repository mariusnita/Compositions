var MainUI = {
    cshow : function() { 
        $('.control').css('top', -20); 
    },

    chide : function() { 
        $('.control').css('top',  -8 - $('.control').height()); 
    },

    resize : function() {
        $('#myCanvas')
            .attr('width',$(window).width())
            .attr('height',$(window).height());
    },

    initRunner: function() {
        var html = [];

        _.each(CompositionRunner.files, function(file) {
            CompositionRunner.loadJs('src/Composition{0}.js'.format(file));
            html.push('<div id="c{0}" class="but" onclick="MainUI.runComposition({0})">{0}</div>'.format(file));
        });

        $('#comps').html(html.join(""));
    },

    runComposition : function(id) {
        $('.active').removeClass('active');
        $('#c{0}'.format(id)).addClass('active');
        CompositionRunner.run(id);
    },

    stopAll: function() {
        $('.active').removeClass('active');
        CompositionRunner.stopAll();
    },

    init: function() {
        $(document).ready(function() {
            $('.control')
                .mouseover(this.cshow)
                .mouseout(this.chide);

            this.initRunner();
            this.resize();
            this.cshow();

            /* run comp 24 by default */
            setTimeout('MainUI.runComposition(24)',1000);
        }.bind(this));
    }
};

MainUI.init();
