import './services.scss'
import './_imports/import'

import $ from 'jquery'

import 'inputmask/dist/jquery.inputmask.bundle'

$(document).ready(function() {
	$('.services__modal-input').inputmask({ mask: '+7 (999) 999-9999' })

	const $modal = $('.services__modal')
	const $modalCloseBtn = $('.services__modal-close-btn', $modal)
	const $darken = $('.dark-bg')
	const $servicesLink = $('.services__item-btn')

	$darken.click(function() {
		$darken.removeClass('dark-bg--show')

		$modal.removeClass('services__modal--show')
	})

	$servicesLink.click(function(e) {
		e.preventDefault()

		$darken.addClass('dark-bg--show')

		$modal.addClass('services__modal--show')
	})

	$modalCloseBtn.click(function() {
		$darken.removeClass('dark-bg--show')

		$modal.removeClass('services__modal--show')
	})
})
