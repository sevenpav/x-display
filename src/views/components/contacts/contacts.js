import './contacts.scss'
import './_imports/import'

import loadGoogleMapsApi from 'load-google-maps-api'

loadGoogleMapsApi({
	key: 'AIzaSyCGHfirQ0GAtnFW4Kpxad1nChj7vvxIvfQ'
}).then(function(googleMaps) {
	new googleMaps.Map(document.querySelector('.contacts__map'), {
		center: { lat: 55.782909, lng: 37.626548 },
		zoom: 12
	})
})
