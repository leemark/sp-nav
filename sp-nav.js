// object.create polyfill
if(typeof Object.create !== 'function'){
    Object.create = function( obj ){
        function F(){}
        F.protoype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ){
    
    var Nav = {
        init: function( options, el ){
            var self = this;
            self.el = el;
            self.$el = $( el );
            if (typeof options === 'string') {
                self.speed = options;
            } else{
                self.speed = options.speed;
                self.options = $.extend( {}, $.fn.spNav.options, options );
            }
            self.attachScroll(self.$el, self.speed);
        },
        attachScroll: function($el, speed){
            $el.find('a[href^=#]').on('click', function( e ){
                var target = $(this).attr('href'); 
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, speed);
                e.preventDefault();
            });    
        }
    };
    
    $.fn.spNav = function( options ){
        return this.each(function(){
            var nav = Object.create( Nav );
            nav.init( options, this );
        });   
    };
    
    $.fn.spNav.options = {
        speed: 700
    };
    
})( jQuery, window, document );

