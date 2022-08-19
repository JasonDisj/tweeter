/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  const renderTweets = function(tweets) {
    $('#tweets-container').html(" ");
    tweets.forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(data) {
    return `
      <div class="tweet">
        <div class="header">
          <div class="profile-img">
            <div class="icon-image">
              <img src="${data.user.avatars}" />
            </div>
            <div class="username">
              <p>${data.user.name}</p>
            </div>
          </div>
            <div class="tag-name">
            <p>
            ${data.user.handle}
            </p>
          </div>
        </div>

        <div class="body">
          <p>${escape(data.content.text)}</p>
        </div>

        <div class="footer">
          <div class="post-date">
            <p>${timeago.format(data.created_at)}</p>
          </div>
          <div class="tweet-icon">
            <i class="fa-solid fa-flag" id="flag"></i>
            <i class="fa-solid fa-retweet" id="retweet"></i>
            <i class="fa-solid fa-heart" id="heart"></i>
          </div>
        </div>
      </div>
    `
  };

    $('#tweet-form').submit(function(event) {
      event.preventDefault();

      const data = $(this).serialize(); // serialize return obj

      const content = $('#tweet-text').val();

      if (content.length > 140) {
        $('.message').html('Too long! Please respect our arbitrary limit!');
        return $('.error-message').slideDown(600);
      }

      if (content.length < 1) {
        $('.message').html('Did you type in anything?');
        return $('.error-message').slideDown(600);
      }

      if (content.length > 0 && content.length <=140) {
        $('.error-message').slideUp(600);
      }

      $.ajax('/tweets', {
        
        method: 'POST',  // http method
        data: data  // data to submit
    
      })
      .then(function() {
        loadTweets();

        $('#tweet-text').val(''); // clear textarea

        $('.counter').val('140'); // reset limit to 140
      });
  })

  const loadTweets =function() {
      $.ajax('/tweets', {
        
        method: 'GET'
      
      })
      .then(function(result) {

        renderTweets(result);
        
      })
  }

  loadTweets();

})
