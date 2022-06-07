
var heatmap;
var map;
var markerEmb = [];
var markerEventos = [];
var markerClusterAll;

var markerClusterEventos;
var markerClusterEmb

var rotasEmb =  [];
var rotasPos;

var markerPos;

var directionsRenderer;
var directionsService;
var lastOpenedInfoWindow;







function initMap(){
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    //Map options
    let mapOptions = {
        center: new google.maps.LatLng('38.654077198334306', '-8.99502557883541'),
        zoom: 17,
        mapTypeId: 'roadmap',
        mapTypeControlOptions:{
            mapTypeIds:[]
        },
        mapId: 'f7dc6b907125f67f'

    }
    //link map options to actual map
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    heatmap = new google.maps.visualization.HeatmapLayer

    var clusterStyles = [{
        height: 53,
        url: "https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m1.png",
        width: 53
    },
        {
            height: 56,
            url: "https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m2.png",
            width: 56
        },
        {
            height: 66,
            url: "https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m3.png",
            width: 66
        },
        {
            height: 78,
            url: "https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m4.png",
            width: 78
        },
        {
            height: 90,
            url: "https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m5.png",
            width: 90
        }
    ];

    const clusterEventosOptions = {
        styles: clusterStyles,

        zoomOnClick: true,
        maxZoom: 16,
    };

    const clusterOptions = {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",

        zoomOnClick: true,
        maxZoom: 16,
    };
    markerClusterAll = new MarkerClusterer(map, [], clusterOptions);

    markerClusterAll.setMap(map);

    markerClusterEmb = new MarkerClusterer(map, [], clusterOptions);
    markerClusterEventos = new MarkerClusterer(map, [], clusterOptions);
    getEventos();




    getEmbarcacoes();

    getCais();



    map.addListener("click", function removebutton(){
        closeLastOpenedInfoWindow();

        document.getElementById("rota").style.display="none";
        for (var i = 0; i < rotasEmb.length ; i++){
            rotasEmb[i].setMap(null);
        }

        document.getElementById('floating-panel').style.display="none"

        directionsRenderer.setMap(null);
    });

    const filtersButtons = document.getElementById('filters');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(filtersButtons);
    //Geolocation
    //Geolocation
    //Geolocation
    //Geolocation



    const locationButton = document.getElementById('button');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.textContent = "Current location";
    locationButton.classList.add("custom-map-control-button");



    locationButton.addEventListener("click", currentLocation)
    window.onload = currentLocation()







    //GEo Coding search bar
    var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);




    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow1 = new google.maps.InfoWindow();
    var geocodingMarker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    }); 


    const addListener = autocomplete.addListener('place_changed', function () {
        infowindow1.close();
        geocodingMarker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        geocodingMarker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        geocodingMarker.setPosition(place.geometry.location);
        geocodingMarker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow1.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow1.open(map, geocodingMarker);
        lastOpenedInfoWindow = infowindow1;

        // Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country'){
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
    });

    const rotaDiv = document.getElementById('floating-panel');
    rotaDiv.style.display="none"
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(rotaDiv);


    directionsRenderer.setOptions( { suppressMarkers: true } );
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("btnrota").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer)
    });



}

const api_url='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais'
async function getCais(){
    const response=await fetch(api_url);
    const cais=await response.json();
    console.log(cais)
    var data
    var infowindowCais= new google.maps.InfoWindow()
    var polygon = [];
    var color = [];
    var bounds = [];
    var latLngArray = [];
    var bic = [];
    for (let i = 0; i < cais.length; i++) {
        var ParseCais = JSON.parse(cais[i].geojson)
        console.log(ParseCais.coordinates)
        console.log(cais[i].cais_name)


        var getNumberOfEmbarcacoesInPolygon_url = 'https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/intersection/number/' + JSON.stringify(cais[i].cais_id)

        !await async function () {
            data = await fetch(getNumberOfEmbarcacoesInPolygon_url)
                .then(response => response.json())
                .catch(err => {
                    console.error('Request failed', err)
                })
                .then(data => {
                    return data.count;
                    console.log(data);
                });
            console.log("ss ",data)
        }();


        bic[i] = data;
        console.log("bic ",bic[i])

        bounds[i] = new google.maps.LatLngBounds();

        var shell = ParseCais.coordinates[0];

        latLngArray[i] = [];


        for (let s = 0; s < shell.length; s++) {
            var pt = new google.maps.LatLng(shell[s][0], shell[s][1]);
            bounds[i].extend(pt);
            latLngArray[i].push(pt);

        }

        if(bic[i] <= 5){
            color[i] = '#008000'
        }else if(bic[i] > 5 && bic[i] <= 20){
            color[i] = '#FFFF00'
        }else{
            color[i] = '#FF0000'
        }

        console.log(latLngArray);
        // Polygon construction.

        polygon[i] = new google.maps.Polygon({
            paths: latLngArray[i],
            strokeColor: color[i],
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: color[i],
            fillOpacity: 0.2
        });
        polygon[i].setMap(map);

        google.maps.event.addListener(polygon[i], 'click', function(event) {
            closeLastOpenedInfoWindow();
            document.getElementById('floating-panel').style.display="inline-block"
            directionsRenderer.setMap(null);
            markerPos = new google.maps.LatLng(cais[i].lat_center, cais[i].long_center);
            var contentString = "<h2>" + cais[i].cais_name + "</h2>    <p> " + cais[i].cais_info + "</p><p><b> Nº de barcos: </b>" + bic[i]+ "";
            console.log(contentString)
            infowindowCais.setContent(contentString);
            infowindowCais.setPosition(event.latLng);
            lastOpenedInfoWindow = infowindowCais;
            infowindowCais.open(map);
            map.fitBounds(bounds[i]);
        });


    }


}

const api_url3='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/verified'
async function getEmbarcacoes(){
    const response=await fetch(api_url3);
    const embarcacoes =await response.json();

    var infowindowEmb = new google.maps.InfoWindow()

    var latLngArray = [];
    var ParseEmbRota = []




    console.log(embarcacoes);

    for (i = 0; i < embarcacoes.length; i++) {



        markerEmb[i] = new google.maps.Marker({
            position: new google.maps.LatLng(embarcacoes[i].lat, embarcacoes[i].long),
            map: map
        });

        markerEmb[i].setIcon('./images/barco-a-vela.png')

        ParseEmbRota[i] = JSON.parse(embarcacoes[i].geojson);


            var shell = ParseEmbRota[i].coordinates;
            latLngArray[i] = [];
            for (let s = 0; s < shell.length; s++) {
                var pt = new google.maps.LatLng(shell[s][0], shell[s][1]);
                latLngArray[i].push(pt);
            }

            const lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 8,
                strokeColor: "#ffd15c",
                fillColor: "#FFFFFF",
                fillOpacity: 1,
                strokeOpacity: 0.3,
            };
            const dashedLineSymbol = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
            };

            rotasEmb[i] = new google.maps.Polyline({
                path: latLngArray[i],
                icons: [

                    {
                        icon: lineSymbol,
                        offset: "100%",
                    }, {
                        icon: dashedLineSymbol,
                        offset: '0',
                        repeat: '20px'
                    }],

                geodesic: true,
                strokeColor:"#0000FF",
                strokeOpacity:0,
                strokeWeight:2
            })
            animateCircle(rotasEmb[i]);
            rotasEmb[i].setMap(null);



        google.maps.event.addListener(markerEmb[i], 'click', (function(marker, i){
            return function() {
                closeLastOpenedInfoWindow();
                document.getElementById('floating-panel').style.display="none"
                document.getElementById("rota").style.display="inline-block"
                directionsRenderer.setMap(null);

                for (var y = 0; y < rotasEmb.length ; y++){
                     rotasEmb[y].setMap(null);
                }

                rotasPos = i;


                infowindowEmb.setContent("<h2>" + embarcacoes[i].embarcacao_name + "</h2><p> " + embarcacoes[i].embarcacao_info + "</p> Proprietário: "+ embarcacoes[i].utilizador_name );

                infowindowEmb.open(map, marker);



                lastOpenedInfoWindow = infowindowEmb;
            }
        })(markerEmb[i], i));
    }

    markerClusterAll.addMarkers(markerEmb)





}



const api_url2='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos'
async function getEventos(){
    const response=await fetch(api_url2);
    const locations=await response.json();


    var infoWindowEventos = new google.maps.InfoWindow()
    console.log(locations);

    for (i = 0; i < locations.length; i++) {
        markerEventos[i] = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map
        });



        markerEventos[i].setIcon('./images/EventoMarker.png')
        google.maps.event.addListener(markerEventos[i], 'click', (function(marker, i) {
            return function() {
                closeLastOpenedInfoWindow();
                console.log("aaaaa")
                document.getElementById('floating-panel').style.display="inline-block"
                document.getElementById("rota").style.display="none";
                directionsRenderer.setMap(null);
                markerPos = new google.maps.LatLng(locations[i].lat, locations[i].long);
                for (var y = 0; y < rotasEmb.length ; y++){
                    rotasEmb[y].setMap(null);
                }
                infoWindowEventos.setContent("<h1> " + locations[i].eventos_name + "</h1>    " + locations[i].eventos_info + "<br><br><b>Data:</b> "+ locations[i].data + "<br><b>Hora de começo</b>: "+  locations[i].eventos_starttime  + "<br><b>Hora de término</b>: "+ locations[i].eventos_endtime );
                lastOpenedInfoWindow = infoWindowEventos;
                infoWindowEventos.open(map, marker);


            }
        })(markerEventos[i], i));
    }


    markerClusterAll.addMarkers(markerEventos)


}

function currentLocation () {
    const infoWindoGeolocation = new google.maps.InfoWindow()
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
                        closeLastOpenedInfoWindow();
                        infoWindoGeolocation.setContent("Você está aqui");
                        infoWindoGeolocation.open(map, marker);
                        lastOpenedInfoWindow = infoWindoGeolocation;
                    }
                })(markerGeolocation));
                map.setCenter(pos);
                map.setZoom(12)
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
    closeLastOpenedInfoWindow();
    directionsRenderer.setMap(map);
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




function clearMarkers() {
    for(i in markerEventos){
        markerEventos[i].setMap(null)
    }
    for(i in markerEmb){
        markerEmb[i].setMap(null);
    }
    heatmap.setMap(null);
    markerClusterAll.removeMarkers(markerEventos);
    markerClusterAll.removeMarkers(markerEmb);
    markerClusterEventos.removeMarkers(markerEventos);
    markerClusterEmb.removeMarkers(markerEmb);
    document.getElementById("rota").style.display="none";
    document.getElementById('floating-panel').style.display="none";
    for (var i = 0; i < rotasEmb.length ; i++){
        rotasEmb[i].setMap(null);
    }



}
function showMarkerEmb() {
    clearMarkers()
    for(i in markerEmb){
        markerEmb[i].setMap(map);
    }
    markerClusterEmb.addMarkers(markerEmb)
}
function showMarkersEventos() {
    clearMarkers()
    for(i in markerEventos){
        markerEventos[i].setMap(map);
    }
    markerClusterEventos.addMarkers(markerEventos)                                                                                                                                                                                          /*MADE BY Luís Silva*/

}

function showAllMarkers() {
    clearMarkers();
    for(i in markerEmb){
        markerEmb[i].setMap(map);
    }
    for(i in markerEventos){
        markerEventos[i].setMap(map);                                                                                                                                                   /*MADE BY Luís Silva*/
    }
    markerClusterAll    .addMarkers(markerEmb)
    markerClusterAll.addMarkers(markerEventos)
}



function activateHeatmap() {
    clearMarkers();

    var _points = [];
    for (i in markerEmb) {
        var pos = markerEmb[i].getPosition();
        var position = new google.maps.LatLng(pos.lat() , pos.lng());
        _points.push(position);
    }
    console.log(markerEmb.latLng)
    console.log(_points)


    heatmap.setData(_points);
    heatmap.setMap(map);
}

function rota(){
    rotasEmb[rotasPos].setMap(map);

}

function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
        count = (count + 1) % 200;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 20);
}

function closeLastOpenedInfoWindow() {
    if (lastOpenedInfoWindow) {
        lastOpenedInfoWindow.close();
    }
}