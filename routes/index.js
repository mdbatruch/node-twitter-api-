var express = require('express');
var Twitter = require('twitter');

var router = express.Router(); 
var client = new Twitter({
  consumer_key: 'CONSUMER KEY HERE',
  consumer_secret: 'CONSUMER SECRET HERE',
  access_token_key: 'ACCESS TOKEN HERE',
  access_token_secret: 'ACCESS TOKEN SECRET HERE'
});

router.get('/', function(req, res, next) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  client.get('statuses/user_timeline', { screen_name: 'mikebored89', count: 4 }, function(error, tweets, response) {
    if (!error) {
      res.status(200).render('index', { title: 'Express', tweets: tweets });
    }
    else {
      res.status(500).json({ error: error });
    }
  });
});

module.exports = router;