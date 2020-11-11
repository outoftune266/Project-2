// Global Variables
let bounds;
let features;

//Map Instantiation
mapboxgl.accessToken = 'pk.eyJ1Ijoib3V0b2Z0dW5lMjY2IiwiYSI6ImNraGF4NnhwZDBrZjMzMms0c2xwejYydmEifQ.CsvsPCXbKiZI9P_psvhAgw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/outoftune266/ckhb1hfdo03im19pd13h9rez2', // style URL
    center: [-86.7, 36.1], // starting position [lng, lat]
    zoom: 9 // starting zoom

});

function getRestaurants() {
    // let minLat = bounds._sw.lat;
    // let maxLat = bounds._ne.lat;
    // let minLng = bounds._sw.lng;
    // let maxLng = bounds._ne.lng;
    let viewport = {
        minLat: bounds._sw.lat,
        maxLat: bounds._ne.lat,
        minLng: bounds._sw.lng,
        maxLng: bounds._ne.lng
    }
    $.get("/api/food", viewport).then(function (data) {
        console.log(data)
    });
};

function getEntertainment() {
    let viewport = {
        minLat: bounds._sw.lat,
        maxLat: bounds._ne.lat,
        minLng: bounds._sw.lng,
        maxLng: bounds._ne.lng
    }
    $.get("/api/entertainment", viewport).then(function (data) {
        console.log(data)
    });
};

map.on('load', function () {
    //Format for features object that will need to be fed to map.addSource
    features = [
        {
            'type': 'Feature',
            'properties': {
                'description':
                    '<strong>Zaks House</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                'icon': 'theatre'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-86.760240, 36.189660]
            }
        }

    ];

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    });

    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });

    //Gets viewport coordinates when user zooms
    //Should be able to get viewport coordinatres when user hits refresh button
    map.on('zoomend', () => {
        bounds = map.getBounds();
        // console.log(bounds);
        getRestaurants();
    });

});

//Click Listener
$("#refesh").on("click", () => {
    bounds = map.getBounds();
    console.log(bounds);
})
