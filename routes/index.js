var express = require('express');
var Twitter = require('twitter');

var router = express.Router(); 
var client = new Twitter({
  consumer_key: 'CONSUMER KEY HERE',
  consumer_secret: 'CONSUMER SECRET HERE',
  access_token_key: 'ACCESS TOKEN HERE',
  access_token_secret: 'ACCESS TOKEN SECRET HERE'
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

router.get('/', function(req, res, next) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  client.get('statuses/user_timeline', { screen_name: 'mroc_canada', count: 4 }, function(error, tweets, response) {
    if (!error) {
        // if a tweet doesn't have media, filter it out
        // only display images for tweets that have a media property
          console.log(tweets);
        var tweets = tweets.map(function(tweet) {
           tweet.created_at = formatDate(tweet.created_at);
            return tweet;
        });
//        res.status(200).json(tweets);
              res.status(200).render('index', { title: 'Express', tweets: tweets, exclude_replies: false});
    }
    else {
      res.status(500).json({ error: error });
    }
  });
});

module.exports = router;