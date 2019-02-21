/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  // 1. Focus Textarea on AJAX data reload
  $("#text_area").focus();

  // 2. Bind '.tweet' to '.hover' event handler
  $( ".tweet" ).hover(
    function() {
      $( ".twitter_links" ).addClass( "show" );
    }, function() {
      $( ".twitter_links" ).removeClass( "show" );
    } 
  );
  
  // 3. Declare the function 'createTweetElement'
  function createTweetElement(tweetData) {
    
    // 3a. Initialize the variables for 'tweet' markup
    var tweet_avatar = tweetData.user.avatars["small"];
    var tweet_heading = tweetData.user.name;
    var tweet_username = tweetData.user.handle;
    var tweet_content = escape(tweetData.content.text);
    var tweet_created_at = tweetData.created_at;

    var formatDate= tweet_created_at;
    var responseDate = moment(formatDate).format('lll');


    // 3b. Initialize the variable for 'tweet' and construct markup
    var tweet = [
      '<article class="tweet">',
        '<header>',
          '<div class="user left">',
            '<div class="user_image">',
              '<img src=' + tweet_avatar + ' alt="twitter avatar" class="avatar">',
            '</div>',
            '<div class="heading">',
              '<h3>' + tweet_heading + '</h3>',
            '</div>',
          '</div>',
          '<div class="user right">',
            '<span class="username">' + tweet_username + '</span>',
          '</div>',
        '</header>',
        '<div class="status">',
          '<div>' + tweet_content + '</div>',
        '</div>',
        '<footer>',
          '<div class="details left">',
            '<span>' + responseDate + '</span>',
          '</div>',
          '<div class="details right">',
            '<ul class="twitter_links">',
              '<li><a href="#" class="flag-icon"><span>Flag Post</span></a></li>',
              '<li><a href="#" class="retweet-icon"><span>Retweet Post</span></a></li>',
              '<li><a href="#" class="like-icon"><span>Like Post</span></a></li>',
            '</ul>',
          '</div>',
          '<div class="clearfix"></div>',
        '</footer>',
      '</article>'
    ].join("\n");

    // 3c. Return 'tweet' markup
    return tweet;
  }

  // 4. Declare the function 'renderTweets'
  function renderTweets(tweets) {

    // 4a. Render each 'tweet' with each using 'createTweetElement' 
    // 4b. Add each 'tweet' to beginning of 'tweets'
    $.each(tweets, function(index, tweet) {
      var tweet_html = createTweetElement(tweet);
      $('.tweets').prepend(tweet_html);
    });
  }

  // 5. Declare the function 'loadTweets'
  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }

  // 6. Call the function 'loadTweets
  loadTweets();

  // 7. Call the function 'loadTweets
  // 7a. Set slider to "new_tweet" container
  var slider = $(".new_tweet");

  // 7b. Bind event handler 'click' to '#compose-button'
  $("#compose-button").on('click', function(){
    
    // 7c. Toggle slider on 'new_tweet' container
    $(".new_tweet").slideToggle(750,"linear");

    // 7d. Reset focus on 'text_area' when slider toggled
    $("#text_area").focus();
  });

  // 8. Handle form submission
  // 8a. Initialize variable for form and get form data
  var form = $('#ajax-tweet');

  // Get the web messages div.
  // 8b. Initialize variable and get '#form-messages' 
  var formMessages = $('#form-messages');

  // Set up an event listener for the web contact form.
  // 8c. Initialize variable for '#form-messages' 
  $(form).submit(function(e) {
    
    // Stop browser from submitting the form using 'preventDefault'
    e.preventDefault();
    
    // Make sure that the web form Messages div has the 'error' class.
    $(formMessages).removeClass('success-msg');
    $(formMessages).addClass('error-msg');
    $('.error-msg').delay(5000).fadeOut(400);
      
    // Check the web form data for character length and empty string.
    var maxLength = 140;
    var value = $("#text_area").val();
    if (value.length > maxLength) {
      return $(formMessages).text('Your tweet content is too long.');
    }
    if (value == '') {
      return $(formMessages).text('Your tweet content is not present.');
    }

    // Serialize the web form data.
    var formData = $(form).serialize();



    // Submit the web form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function() {
      
      // Make sure that the web form Messages div has the 'success' class.
      $(formMessages).removeClass('error-msg');
      $(formMessages).addClass('success-msg');
      $('.success-msg').delay(3000).fadeOut(400);

      // Set the web form message text.
      $(formMessages).text('Your tweet was sent.');
      
      // Clear the web form.
      $('#text_area').val('');

      // Reset value of character counter
      $('#count').text('140');
      
      // Reload tweets after submitting the web form.
      loadTweets();
    })
    .fail(function(data) {
      
      // Make sure that the web form Messages div has the 'error' class.
      $(formMessages).removeClass('success-msg');
      $(formMessages).addClass('error-msg');
      $('.error-msg').delay(3000).fadeOut(300);

      // Check response for empty inputs and send either success or user message
      if (data.responseText !== '') {
        $(formMessages).text('Your tweet was sent.');
      } else {
        $(formMessages).text('Your tweet content is not present.');
      }
      
    });        

  });
  
});
