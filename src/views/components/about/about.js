import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'

import 'owl.carousel'

$(document).ready(function() {
  const $slider = $('.about__slider-view')
  $slider.owlCarousel({
    items: 1,
    dots: false,
    nav: false,
    loop: true,
    margin: 40,
    autoHeight: true
  })

  $('.about__slider-btn-right').click(function() {
    $slider.trigger('next.owl.carousel')
  })
  $('.about__slider-btn-left').click(function() {
    $slider.trigger('prev.owl.carousel', [300])
  })
})
