// Global Variables
let bounds;
let features = [];
const newMap = document.getElementById("map");
const slider = document.querySelector(".slider");
const logo = document.querySelector(".logo");
//const  = document.querySelector(".hero");
const headline = document.querySelector(".headline");
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

//Map Instantiation
mapboxgl.accessToken = 'pk.eyJ1Ijoib3V0b2Z0dW5lMjY2IiwiYSI6ImNraGF4NnhwZDBrZjMzMms0c2xwejYydmEifQ.CsvsPCXbKiZI9P_psvhAgw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/outoftune266/ckhb1hfdo03im19pd13h9rez2', // style URL
    center: [-86.7, 36.1], // starting position [lng, lat]
    zoom: 9 // starting zoom

});

// Queries database to return location in map viewport and builds out object to display them
function getRestaurants() {
    let viewport = {
        minLat: bounds._sw.lat,
        maxLat: bounds._ne.lat,
        minLng: bounds._sw.lng,
        maxLng: bounds._ne.lng
    }
    $.get("/api/food", viewport).then(function (data) {
        console.log(data)
        for (i = 0; i < data.length; i++) {
            let feature;
            if (`${data[i].website}` === "n/a") {
                feature = {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            `<strong>${data[i].restaurantName}</strong>
                        <p>Cuisine: ${data[i].cuisine}<br>
                        Location: ${data[i].location}<br>
                        Cost: ${data[i].cost}<br>
                        Rating: ${data[i].rating}<br>
                        Family Friendly: ${data[i].familyFriendly}<br>
                        You've Gotta Try: ${data[i].mustTry}<br>
                        Website: ${data[i].website}
                        </p>`,
                        'icon': 'restaurant'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [`${data[i].longitude}`, `${data[i].latitude}`]
                    }
                };
            } else {
                feature = {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            `<strong>${data[i].restaurantName}</strong>
                        <p>Cuisine: ${data[i].cuisine}<br>
                        Location: ${data[i].location}<br>
                        Cost: ${data[i].cost}<br>
                        Rating: ${data[i].rating}<br>
                        Family Friendly: ${data[i].familyFriendly}<br>
                        You've Gotta Try: ${data[i].mustTry}<br>
                        Website: ${data[i].website}
                        <a href="https://${data[i].website}" target="_blank" title="Opens in a new window">Website</a>
                        </p>`,
                        'icon': 'restaurant'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [`${data[i].longitude}`, `${data[i].latitude}`]
                    }
                };
            };
            features.push(feature);
        };
        //console.log(features);
        displayFeatures();
    });
};

// Uses object created by getRestaurant funciton and displays locaiton on the map
function displayFeatures() {
    //console.log(features);
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
};

// Removes locations from the map
function removeFeatures() {
    map.removeLayer("places");
    map.removeSource("places");
};

// Entertainment feature for future implementation
// function getEntertainment() {
//     let viewport = {
//         minLat: bounds._sw.lat,
//         maxLat: bounds._ne.lat,
//         minLng: bounds._sw.lng,
//         maxLng: bounds._ne.lng
//     }
//     $.get("/api/entertainment", viewport).then(function (data) {
//         console.log(data)
//     });
// };

// Grabs NE and SW corner coordiantes of map viewport
function getCoordinates() {
    bounds = map.getBounds();
}

// Displays initial POI when map is loaded
map.on('load', function () {

    getCoordinates();
    getRestaurants();

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });

});

// Removes animation layer and sets map z-index once animation is complete
setTimeout(function () {
    $(".intro").remove();
    $(".slider").remove();
    $("#map").attr("style", "z-index: 1");
}, 4000);

//Click Listeners
$("#refresh").on("click", () => {
    features = [];
    getCoordinates();
    removeFeatures();
    getRestaurants();

    // displayFeatures();
});

$("#addLocation").on("click", () => {
    window.location.replace("/form");
});

// Animation settings
tl.to(".text", { y: "0%", duration: 1, stagger: 0.55 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 })
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1")
tl.fromTo(".toggle", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1")
tl.fromTo("footer", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1")
