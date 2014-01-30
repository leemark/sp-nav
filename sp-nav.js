// object.create polyfill
if(typeof Object.create !== 'function'){
    Object.create = function( obj ){
        function F(){}
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ){
    
    var Nav = {
        init: function( options, el ){
            var self = this;
            self.el = el;
            self.$el = $( el );
            console.log(options);
            if (typeof options === 'string' || typeof options === 'number' ) {
                self.speed = options;
                self.offset = $.fn.spNav.options.offset;
            } else{
                self.speed = options.speed || $.fn.spNav.options.speed;
                self.offset = options.offset || $.fn.spNav.options.offset;
                self.activeClass = options.activeClass || $.fn.spNav.options.activeClass;
                self.options = $.extend( {}, $.fn.spNav.options, options );
            }
            self.attachScroll(self.$el, self.speed, self.offset, self.activeClass);
        },
        attachScroll: function($el, speed, offset, activeClass){
            var navItems = $el.find('a[href^=#]'); 
            navItems.on('click', function( e ){
                var target = $(this).attr('href'); 
                var yPos = $(target).offset().top + offset;
                $('html, body').animate({
                    scrollTop: yPos
                }, +speed);
                navItems.each(function(){
                    var target = $(this).attr('href');
                    $(target).removeClass(activeClass);
                });
                $(target).addClass(activeClass);
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
        speed: 700, 
        offset: 0,
        activeClass: 'sp-active'
    };
    
})( jQuery, window, document );

