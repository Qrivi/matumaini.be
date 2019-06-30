var map, city, cities;

$( function() {
    $( 'body>header>div>h1' ).appear();

    $( 'body>header>div>h1' ).on( {
        'mouseenter': function() {
            $( 'body>header>div' ).css( 'opacity', '.2' );
        },
        'mouseleave': function() {
            $( 'body>header>div' ).css( 'opacity', '1' );
        },
        'appear': function() {
            if( $( this ).is( ':appeared' ) && $( window ).scrollTop() )
                $( 'header nav > ul' ).slideUp( 250 );
        },
        'disappear': function() {
            if( !$( this ).is( ':appeared' ) ) {
                $( 'header nav > ul' ).addClass( 'sticky' );
                $( 'header nav > ul' ).hide();
                $( 'header nav > ul' ).slideDown( 250 );
            }
        }
    } );

    $( window ).scroll( function() {
        if( !$( window ).scrollTop() ) {
            $( 'header nav > ul' ).removeClass( 'sticky' );
            $( 'header nav > ul' ).fadeIn( 250 );
        }
    } );

    $( 'a[href*="#"]:not([href="#"])' ).on( 'click', function() {
        smoothScroll( this );
    } );

    $( '#verwezelijkingen li' ).on( 'click', function() {
        var lat = parseFloat( $( '.' + $( this ).text().trim() ).data( 'lat' ) );
        var lng = parseFloat( $( '.' + $( this ).text().trim() ).data( 'lng' ) );
        map.flyTo( { center: [ lng, lat ], zoom: 14 } );
    } );

    city = 0;
    cities = $( '#verwezelijkingen ul li' ).length;

    smoothScroll();
    loadMap();
    setInterval( nextPhoto, parseInt( $( 'body>header>figure' ).data( 'speed' ) ) );
    setInterval( nextCity, parseInt( $( '#verwezelijkingen' ).data( 'speed' ) ) );
} );

function smoothScroll( to ) {
    var target;

    if( to && location.pathname.replace( /^\//, '' ) == to.pathname.replace( /^\//, '' ) && location.hostname == to.hostname )
        target = $( to.hash );
    else if( !to )
        target = $( location.hash );

    if( target.length ) {
        $( 'html, body' ).animate( {
            scrollTop: target.offset().top - 50
        }, 1000 );
        return false;
    }
}

function nextPhoto() {
    var current = $( 'body>header>figure>img:last-of-type' );
    current.fadeOut( 1500, function() {
        $( 'body>header>figure' ).prepend( current );
        current.show();
    } );
}

function nextCity() {
    if( !$( '#verwezelijkingen:hover' ).length ) {
        city++;
        if( city > cities )
            city = 1;
        $( '#verwezelijkingen li:nth-of-type(' + city + ')' ).click();
    }
}

function loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicXJpdmkiLCJhIjoicXRVWmhDNCJ9.6uKJH1YNBkLbus8T_ZvRFA';

    map = new mapboxgl.Map( {
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9'
    } );

    $( '.marker' ).each( function() {
        var lat = parseFloat( $( this ).data( 'lat' ) );
        var lng = parseFloat( $( this ).data( 'lng' ) );

        new mapboxgl.Marker( this )
            .setLngLat( [ lng, lat ] )
            .addTo( map );
    } );

    map.addControl( new mapboxgl.NavigationControl() );
    map.scrollZoom.disable();

    $( '#verwezelijkingen li:nth-of-type(' + cities + ')' ).click();
}
