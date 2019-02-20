// 1. Initialize jQuery's document ready function
$(document).ready(function(){

  // 2. Set variable for 'maxChararcters' to 140
    // Set maximum characters to 140
  maxCharacters = 140;

  // 3. Pass '#count' to '.text()' method and set 'maxCharacters' as parameter
    // Prepare to compare count from DOM to counter function
  $('#count').text(maxCharacters);

  // 4. Bind 'keyup' & 'keydown' events to 'textarea' 
    // Check for keyboard events
  $('textarea').bind('keyup keydown', function() {
  
    // 5. Initialize variable for 'count' and set '#count'
      // Compare key presses to maximum characters
    var count = $('#count');

    // 6. Initialize variable for 'count' and set to '#count'
      // Display count value on based on key presses
    var characters = $(this).val().length;
    
    // 7. Initialize variable for 'count' and set '#count'
      // Display user messages based on character limit value
    if (characters > maxCharacters) {
      count.addClass('user_msg_limit');
    } else {
      count.removeClass('user_msg_limit');
    }
    
    // 8. Compare '#count' from DOM to 'maxCharacters'
      // Return value of characters remaining in character limit
    count.text(maxCharacters - characters);

  });

});
