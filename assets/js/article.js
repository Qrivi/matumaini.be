$( function() {
    $( '.post p' ).each( function() {
        if( !$( this ).text().trim().length && $( this ).has( 'img' ) ) {
            $( this ).addClass( 'lightbox' );
            $( '.lightbox img' ).each( function() {
                var img = $( this ),
                    href = img.attr( 'src' ),
                    clazz = img.attr( 'class' ),
                    alt = img.attr( 'alt' );
                if( !clazz || ( !clazz.includes( 'left' ) && !clazz.includes( 'right' ) ) )
                    img.wrap( '<a href="' + href + '" title="' + alt + '" class="swipebox ' + clazz + '"></a>' );
                $( '.swipebox' ).swipebox();
            } );
        }
    } );
} );
