import './footer.scss'
import './_imports/import'

import $ from 'jquery'

const $links = $('.footer__link')

$links.click(function(e) {
	e.preventDefault()

	const $target = $($(this).data('target'))

	$('html, body').animate({ scrollTop: $target.offset().top - 20 }, 400)
})
