import $ from 'jquery'
import 'inputmask/dist/jquery.inputmask.bundle'

$(() => {
  const $modal = $('.promo__modal')
  const $modalCloseBtn = $('.promo__modal-close-btn', $modal)
  const $darken = $('.dark-bg')
  const $promoLink = $('.promo__link')

  $darken.click(function() {
    $darken.removeClass('dark-bg--show')

    $modal.removeClass('promo__modal--show')
  })

  $promoLink.click(function(e) {
    e.preventDefault()

    $darken.addClass('dark-bg--show')

    $modal.addClass('promo__modal--show')
  })

  $modalCloseBtn.click(function() {
    $darken.removeClass('dark-bg--show')

    $modal.removeClass('promo__modal--show')
  })

  $('#phone', $modal).inputmask({ mask: '+7 (999) 999-9999' })
})
