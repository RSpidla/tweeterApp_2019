/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      // 'tweet_heading' - User Name
      // 'tweet_username' - User Handle
      // 'tweet_content' - Text Content
      // 'tweet_created_at' - Creation Date
    var tweet_heading = tweetData.user.name;
    var tweet_username = tweetData.user.handle;
    var tweet_content = tweetData.content.text;
    var tweet_created_at = tweetData.created_at;

    // 3b. Initialize the variable for 'tweet' and construct markup
    var tweet = [
      '<article class="tweet">',
        '<header>',
          '<div class="user left">',
            '<div class="user_image">',
              '<img src="/images/twitter_avatar_400x400.jpg" alt="twitter avatar" class="avatar" />',
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
            '<span>' + tweet_created_at + '</span>',
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

    // 3b. Return 'tweet' markup
    return tweet;
  }

  // 4. Declare the function 'renderTweets'
  function renderTweets(tweets) {
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

  // Slide Up Down Function
  
  // 7. Call the function 'loadTweets
  var slider = $(".new_tweet");
  $("#compose-button").on('click', function(){
    $(".new_tweet").slideToggle(750,"linear");
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
    // 
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

      if (data.responseText !== '') {
        $(formMessages).text('Your tweet was sent.');
      } else {
        $(formMessages).text('Your tweet content is not present.');
      }
      
    });        

  });
  
});


