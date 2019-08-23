import './contacts.scss'
import './_imports/import'

import loadGoogleMapsApi from 'load-google-maps-api'

loadGoogleMapsApi({
	key: 'AIzaSyCWyhyHQCU47Jp89GOZhwNC0BLA4vSl4kQ'
}).then(function(googleMaps) {
	var map = new googleMaps.Map(document.querySelector('.contacts__map'), {
		center: { lat: 56.075699, lng: 37.051103 },
		zoom: 25
	})
/*
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Офис и производство</h1>'+
        '<div id="bodyContent">'+
        '<p>МО, пос. Поварово, 141540, ул. Почтовая, 29c11, офис 304'
        '</p>'+
        '</div>'+
        '</div>';

    var infowindow = new googleMaps.InfoWindow({
         content: contentString,
         maxWidth: 400
    });
    
    var marker = new google.maps.Marker({
        position: { lat: 56.075699, lng: 37.051103 },
        map: map,
        title: 'X-DISPLAY'
    });

    marker.addListener('click', function() {
         infowindow.open(map, marker);
    });
*/
})
