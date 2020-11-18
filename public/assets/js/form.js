// Global Variables
let address;

// Grabs input values from form and uses opencagedata API to get Lat/Lng for location
function getLocation() {
    // let address = $("#coord").val();
    let name = $("#name").val();
    let cuisine = $("#cuisine").val();
    let cost = $("#cost").val();
    let url = $("#url").val();
    let rating = $("#rating").val();
    let family = document.getElementById("family").checked;
    let mustTry = $("#try").val();
    // console.log(url);
    if (url) {
        url = url;
    } else {
        url = "n/a";
    }
    // console.log(url);

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
        // alert("Your entry has been recorded! Enter another location or click GO BACK HOME to return to the map");
        toastr.info('Your submission has been added to the database!', "Thanks!");
    })
}

// Options for toast notifications
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

// Event listener to send user back to the main page
$(".home").on("click", () => {
    window.location.replace("/");
});


// Initializes Algolia for address autocompletion
$(document).ready(function () {
    (function () {
        var placesAutocomplete = places({
            appId: 'pl27IHPE0VXJ',
            apiKey: '2e8037da63fcfb06b866975b7cd5b509',
            container: document.querySelector("#coord"),
            templates: {
                value: function (suggestion) {
                    return suggestion.name;
                }
            }
        }).configure({
            type: "address",
        });

        placesAutocomplete.on("change", function(e) {
            address = e.suggestion.name + " " + e.suggestion.city + ", " + e.suggestion.administrative + " " + e.suggestion.postcode;
            console.log(address);
        });
    })();
});