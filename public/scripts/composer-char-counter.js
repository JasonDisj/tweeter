$(document).ready(function() {

  $('#tweet-text').on('keyup', function() {

    let $value = $(this).val();

    let total = 140 - $value.length;

    $('.counter').text(total);

    if (total < 0) {
      $('.counter').addClass('over');
      
    } else {
      $('.counter').removeClass('over');
    }
  })

});