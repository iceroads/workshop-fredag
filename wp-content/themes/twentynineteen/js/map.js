// Funktion som kallas av Google för att skapa vår karta
// Denna function anger vi i en callback parameter i script
var map;
function initMap() {
    // Sätt latitude och longitud i en variabel
    var uluru = {lat: -25.344, lng: 131.036};
    // Instansiera en ny Google Maps com är centrerad på ovanstående kordinater
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: uluru,
            disableDefaultUI: true,
            gestureHandling: 'none'
        }
    );

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Sätt ut en markering på kartan med positionen från vår variabel
            new google.maps.Marker(
                {
                    position: pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
                }
            );

            map.setCenter(pos);
            map.setZoom(15);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}