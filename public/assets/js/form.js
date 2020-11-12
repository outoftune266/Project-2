
//let location = document.getElementById("coord");
// function city() {


//     console.log(city);
//     getLocation(city);
// }

function getLocation() {
    let city = $("#coord").val();
    let name = $("#name").val();
    let cuisine = $("#cuisine").val();
    let cost = $("#cost").val();
    let url = $("#url").val();
    let rating = $("#rating").val();
    let family = $("#family").val();
    let mustTry = $("#try").val();
    console.log(family);
    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=d0ec5acfd95d41b2b3da1850a8ae6d1a";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        lat = response.results[0].geometry.lat;
        lng = response.results[0].geometry.lng;
        newLocation(name, cuisine, location, cost, url, rating, lat, lng, family, mustTry)
    });
};


$(".submit").on("click", function (e) {
    e.preventDefault();
    getLocation();
});


function newLocation(name, cuisine, location, cost, url, rating, lat, lng, family, mustTry) {
    //console.log(name);
    // let data = {
    //     restaurantName: name,
    //     cuisine: cuisine,
    //     location: location,
    //     cost: cost,
    //     website: url,
    //     rating: rating,
    //     latitude: lat,
    //     longitude: lng,
    //     familyFriendly: family,
    //     mustTry: mustTry
    // };
    // $.ajax({
    //     url: "/api/food",
    //     method: "POST",
    //     data: {
    //         restaurantName: name
    //     },
    //     dataType: "json"
    // }).then(() => {
    //         alert("hi");
    //     })
    $.post("/api/food",
        {
            restaurantName: name,
            cuisine: cuisine,
            location: location,
            cost: cost,
            website: url,
            rating: rating,
            latitude: lat,
            longitude: lng,
            familyFriendly: family,
            mustTry: mustTry
        },
        function (data, status) {
            console.log(data);
            console.log(status);
        });
};
// ).done(function (data) {
//         alert("Thanks for entering a restaurant!!!!!!!")
//         console.log(data);
//         // If there's an error, handle it by throwing up a bootstrap alert
//     }).catch(handleLoginErr);
// }