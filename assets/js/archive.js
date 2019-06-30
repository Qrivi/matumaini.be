$( function() {
    $( '#searchform' ).submit( function( e ) {
        var l = window.location.href + '/zoeken/';
        var s = window.location.href.indexOf( '/query:' ) + 1;
        if( s ) l = window.location.href.substring( 0, s );

        window.location.href = l + 'query:' + $( 'input[type=search]' ).val();
        e.preventDefault();
        return false;
    } );
} );
