var Twitter = require('twitter'),
    config = require('./config.js'),
    T = new Twitter(config);

var params = {
  q: '#nodejs',
  count: 10,
  rsult_type: 'recent',
  lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
  if(!err) {
    for( let i = 0; i < data.statuses.length; i++) {
      let id = { id : data.statuses[i].id_str }
      T.post('favorites/create', id, function(err, response) {
        if (err) {
          console.log(err[0].message);
        } else {
          let username = response.user.screen_name,
              tweetid = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetid}`)
        }
      });
    }
  } else {
    console.log(err); 
  }
});

