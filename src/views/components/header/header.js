import $ from 'jquery'

$(() => {
  const $links = $('.header__nav-link')

  const $mobileContainer = $('.header__mobile-container')

  $links.click(function(e) {
    e.preventDefault()

    const $target = $($(this).data('target'))

    $('html, body').animate({ scrollTop: $target.offset().top - 20 }, 400)
  })

  const $hamburger = $('.hamburger')

  $hamburger.click(() => {
    $hamburger.toggleClass('is-active')
    $mobileContainer.toggleClass('header__mobile-container--show')
  })
})
