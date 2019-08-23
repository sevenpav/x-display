import './partnership.scss'
import './_imports/import'
  
import $ from 'jquery'

$(() => {
  const $modal = $('.promo__modal')
  const $modalCloseBtn = $('.promo__modal-close-btn', $modal)
  const $darken = $('.dark-bg')
  const $link = $('.partnership__link')

  $darken.click(function () {
    $darken.removeClass('dark-bg--show')

    $modal.removeClass('promo__modal--show')
  })

  $link.click(function (e) {
    e.preventDefault()

    $darken.addClass('dark-bg--show')

    $modal.addClass('promo__modal--show')
  })

  $modalCloseBtn.click(function () {
    $darken.removeClass('dark-bg--show')

    $modal.removeClass('promo__modal--show')
  })
})
