/* jQuery appear plugin - 0.3.6
 * https://github.com/morr/jquery.appear/ */
! function( e ) { var r = [],
        t = !1,
        i = !1,
        a = { interval: 250, force_process: !1 },
        n = e( window ),
        o = [];

    function f() { i = !1; for( var t = 0, a = r.length; t < a; t++ ) { var n = ( p = r[ t ], e( p ).filter( function() { return e( this ).is( ":appeared" ) } ) ); if( n.trigger( "appear", [ n ] ), o[ t ] ) { var f = o[ t ].not( n );
                f.trigger( "disappear", [ f ] ) } o[ t ] = n } var p } e.expr[ ":" ].appeared = function( r ) { var t = e( r ); if( !t.is( ":visible" ) ) return !1; var i = n.scrollLeft(),
            a = n.scrollTop(),
            o = t.offset(),
            f = o.left,
            p = o.top; return p + t.height() >= a && p - ( t.data( "appear-top-offset" ) || 0 ) <= a + n.height() && f + t.width() >= i && f - ( t.data( "appear-left-offset" ) || 0 ) <= i + n.width() }, e.fn.extend( { appear: function( n ) { var p, s = e.extend( {}, a, n || {} ),
                u = this.selector || this; if( !t ) { var c = function() { i || ( i = !0, setTimeout( f, s.interval ) ) };
                e( window ).scroll( c ).resize( c ), t = !0 } return s.force_process && setTimeout( f, s.interval ), p = u, r.push( p ), o.push(), e( u ) } } ), e.extend( { force_appear: function() { return !!t && ( f(), !0 ) } } ) }( "undefined" != typeof module ? require( "jquery" ) : jQuery );
