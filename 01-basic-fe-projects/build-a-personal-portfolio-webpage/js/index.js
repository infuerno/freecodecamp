$('.nav a').on('click', function() {
  // animate the scroll
  event.preventDefault();
  $('html,body').animate({
    scrollTop: $(this.hash).offset().top
  }, 500);
  // close the menu if using the mobile toggle button
  if ($('.navbar-toggle').css('display') === 'block') {
    $('.navbar-toggle').click();
  }
});

console.log($('#about').offset().top);
console.log($('#portfolio').offset().top);
console.log($('#contact').offset().top);