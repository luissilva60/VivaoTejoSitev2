var evento = JSON.parse(window.localStorage.getItem('evento'));
console.log(evento);
console.log(evento.data);

var markerPos;



document.getElementById("eventos_data").textContent = "Data: " + evento.data
console.log(evento.data)
document.getElementById("eventos_name").textContent = evento.eventos_name
document.getElementById("eventos_starttime").textContent = "Início do evento: " + evento.eventos_starttime
document.getElementById("eventos_endtime").textContent = "Fim do evento: " + evento.eventos_endtime
document.getElementById("eventos_info").textContent = evento.eventos_info
var directionsRenderer;
var directionsService;
var markerEvento;

var map;
var bounds;

function initMap() {



    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    let mapOptions = {
        center: new google.maps.LatLng(evento.lat, evento.long),
        zoom: 12,
        mapTypeId: 'roadmap',
        mapTypeControlOptions:{
            mapTypeIds:[]
        },
        mapId: 'f7dc6b907125f67f'

    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    markerEvento = new google.maps.Marker({
        position: new google.maps.LatLng(evento.lat, evento.long),
        map: map
    });

    markerPos = new google.maps.LatLng(evento.lat, evento.long);
    markerEvento.setIcon('./images/EventoMarker.png')
    //markersPos.push(markerEvento.position);


















    currentLocation()

    directionsRenderer.setMap(map);


    directionsRenderer.setOptions( { suppressMarkers: true } );
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("btnrota").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer)
    });

    //markerBounds();



    //markerBounds();


    // bounds.setMap(map)



    //markerBounds();


}



function currentLocation () {
    const infoWindowGeolocation = new google.maps.InfoWindow()
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                markerGeolocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat, pos.lng),
                    map: map
                });




                markerGeolocation.setIcon('./images/location.png')
                google.maps.event.addListener(markerGeolocation, 'click', (function(marker) {
                    return function() {
                        infoWindowGeolocation.setContent("Você está aqui");
                        infoWindowGeolocation.open(map, marker);
                    }
                })(markerGeolocation));
            },
            () => {
                handleLocationError(true, infoWindoGeolocation, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindoGeolocation, map.getCenter());
    }
}


var pos;





function calculateAndDisplayRoute(directionsService, directionsRenderer) {


    const selectedMode = document.getElementById("mode").value

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            },
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    console.log(pos)

    directionsService
        .route({
            origin: pos,
            destination: markerPos,

            travelMode: google.maps.TravelMode[selectedMode],

        })

        .then((response) => {
            directionsRenderer.setDirections(response);
        })
}








function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
}

function markerBounds(){
    bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markersPos.length; i++) {
        bounds.extend(markersPos[i]);
    }
    console.log("adawdasdadasdas" + bounds)
    map.fitBounds(bounds);



}




//document.getElementById("eventos_id3").textContent = eventos[2].evento_titulo
//document.getElementById("evento_titulo3").textContent = eventos[2].evento_titulo
//document.getElementById("evento_descricao3").textContent = eventos[2].evento_descricao



