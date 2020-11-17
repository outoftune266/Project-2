// Grabs input values from form and uses opencagedata API to get Lat/Lng for location
function getLocation() {
    let address = $("#coord").val();
    let name = $("#name").val();
    let cuisine = $("#cuisine").val();
    let cost = $("#cost").val();
    let url = $("#url").val();
    let rating = $("#rating").val();
    let family = document.getElementById("family").checked;
    let mustTry = $("#try").val();
    console.log(url);
    if (url) {
        url = url;
    } else {
        url = "n/a";
    }
    console.log(url);
    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + address + "&key=d0ec5acfd95d41b2b3da1850a8ae6d1a";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        lat = response.results[0].geometry.lat;
        lng = response.results[0].geometry.lng;
        newLocation(name, cuisine, address, cost, url, rating, lat, lng, family, mustTry)
    });
};

// Returns value of checkbox for test purposes
function check() {
    let check = document.getElementById("family").checked;
    console.log(check);
}

// Event listener that calls getLocation function and clears input fields
$(".submit").on("click", function (e) {
    e.preventDefault();
    getLocation();
    $(".form-input").find("input").val("");
    $("#family").prop("checked", false);

});

// Sends POST request to server to add location to database
function newLocation(name, cuisine, address, cost, url, rating, lat, lng, family, mustTry) {
    $.ajax({
        url: "/api/food",
        method: "POST",
        data: {
            restaurantName: name,
            cuisine: cuisine,
            location: address,
            cost: cost,
            website: url,
            rating: rating,
            latitude: lat,
            longitude: lng,
            familyFriendly: family,
            mustTry: mustTry,
        },
        dataType: "json"
    }).then(() => {
        alert("Your entry has been recorded! Enter another location or click GO BACK HOME to return to the map");
    })
}

// Event listener to send user back to the main page
$(".home").on("click", () => {
    window.location.replace("/");
});


// For Furture development to autocomplete addresses
// const places = require('places.js');
// var placesAutocomplete = places({
//     appId: 'SHWWQFUKYV',
//     apiKey: '84715ad095e73cb3e21048ae45bcd524',
//     container: document.querySelector('#coord')
//   });

// $(document).ready(function () {
//     (function () {
//         var placesAutocomplete = places({
//             appId: ‘plN7IU9KL60M’,
//             apiKey: ‘7dbf0d051f67734266786c8810950b69’,
//             container: document.querySelector(‘#address’),
//             templates: {
//                 value: function (suggestion) {
//                     return suggestion.name;
//                 }
//             }
//         }).configure({
//             type: ‘city’,
//             aroundLatLngViaIP: false,
//         });
//     })();
// });