

var T = require('./twitter').createClient();
var config = require('../config/config.js')

let ME = config.ME

T.setAuth (
    config.consumer_key,
    config.consumer_secret,
    config.access_token_key,
    config.access_token_secret
)

const fs = require('fs')
const path = require('path')
const http = require('http')


// crypto
// url
// https
// querystring



function handleError(error) {
  console.error('response status:', error.statusCode);
  console.error('data:', error.data);
}

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
}

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args

let args = process.argv
let [cmd, scp, ...opts] = args

// action

let action = 'help', pars = []
if (opts.length === 0) {    // action: help

  action = 'help'

} else if (opts[0] === 'posteon' ){
  
  action = opts[0]
  pars = opts.slice(1)
  
  if (pars.length > 0) {
    let codepattern = pars[0]
    let inscopepattern = new RegExp(`^eon-z-${codepattern}.*\.html$`, 'i')
    
    let indir = './'
    let files = fs.readdirSync(indir) // to view
      .filter(file => isFile(file))
      .filter(d => inscopepattern.test(d))
      
      
      console.assert(files.length === 1)
      let file = files[0]

      let regex2 = new RegExp('^((eon-z)-(.*)-(.*))\.(html)', 'i')
      let parts = file.match(regex2)
      
      let root = parts[1]
      let mediafile = `${root}.gif`
      let statusfile = `${root}.txt`
      
      console.assert(fs.existsSync(mediafile))
      console.assert(fs.existsSync(statusfile))
      let status = fs.readFileSync(statusfile, 'utf8')      
      
      
      pars[0] = `./${mediafile}`
      pars[1] = `${root}`
      pars[2] = `${status}`

      
  }
  

  
} else {

  action = opts[0]
  pars = opts.slice(1)

}



 // .................. credentials
let credentials = function() {
  T.get( 'account/verify_credentials', { skip_status: true }, function( user, error, status ){
    console.log( user ? 'Authenticated as @'+user.screen_name : 'Not authenticated' )
  })
}

  // .................. stream
  // track=foo&follow=1234 returns Tweets matching “foo” OR created by user 1234.
let stream = function (topic = '#javascript', max = 10) {
  var num = 0
  T.stream( 'statuses/filter', { track: topic }, function( json, error ){
      if( error ){
          console.error('Stream error: ' + error)
          return;
      }
      var tweet = JSON.parse( json )
      if( tweet.text && tweet.user ){
          console.log( tweet.user.screen_name+': "'+tweet.text+'"')
          if( ++num === max ){
              console.log('----')
              T.abort()
          }
      }
  } )
}

  // .................. followers
// Page through followers
let followerspaged = function (user = ME, cursor = '-1') {

    T.get( 'followers/ids', { cursor: cursor, screen_name: user, skip_status: true }, function( page, error, status ){
        if( error ){
            if( 429 === status ){
                var resetTime = T.getRateLimitReset();
                console.error('Wait until '+ resetTime.toString() );
            }
        }
        else {
            console.log('OK: '+cursor+' -> '+page.ids.length+' followers' );
            cursor = page.next_cursor_str;

            var limit = T.getRateLimit();
            if( limit ){
                var remaining = T.getRateLimitRemaining();
                if( !remaining ){
                    console.log( 'No requests left. Next call will throw 429 .. you\'ll see' );
                }
                else {
                    console.log( remaining+' of '+limit+' requests remaining');
                }
            }
            cursor && followers(user, cursor);
        }
    } )
}

  // .................. ids
// followers
let followers = function (user = ME) {

    T.get( 'followers/ids', { screen_name: user }, function( page, error, status ){
        if( error ){
            if( 429 === status ){
                var resetTime = T.getRateLimitReset();
                console.error('Wait until '+ resetTime.toString() );
            }
        }
        else {
            console.log('page: '+ page.ids)

        }
    } )
}

  // .................. get
let get = function(id = '1054452677441142784') {
  T.get( 'statuses/show', { id: id }, function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
    if (page.extended_entities) console.log(page.extended_entities.media[0])
    if (page.extended_entities && page.extended_entities.media[0].video_info) console.log(page.extended_entities.media[0].video_info.variants)
  })
}


  // .................. post a tweet
let postweet = function(status = '') {
  let callback = function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
  }

  if(typeof status !== 'string') {
    return callback(new Error('tweet must be of type String'))
  } else if(status.length > 280) {
    return callback(new Error('tweet is too long: ' + status.length))
  }
  T.post('statuses/update', { status: status }, callback)
}


  // .................. retweet
let retweet = function(params) {
  let callback = function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
  }
  T.get('search/tweets', params, function (error, reply) {
    if(error) return callback(error);

    var tweets = reply.statuses;
    var randomTweet = randIndex(tweets);
    if(typeof randomTweet != 'undefined')
      self.twit.post('statuses/retweet/:id', { id: randomTweet.id_str }, callback);
    });
};


  // .................. favorite a tweet
let favorite = function (params) {
  let callback = function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
  }

  T.get('search/tweets', params, function (error, reply) {
    if(error) return callback(error);

    var tweets = reply.statuses;
    var randomTweet = randIndex(tweets);
    if(typeof randomTweet != 'undefined')
      self.twit.post('favorites/create', { id: randomTweet.id_str }, callback);
    });
};

  // .................. choose a random friend of one of your followers, and follow that user
let mingle = function () {
  let callback = function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
  }

  T.get('followers/ids', function(error, reply) {
      if(error) { return callback(error); }

      var followers = reply.ids
        , randFollower  = randIndex(followers);

      T.get('friends/ids', { user_id: randFollower }, function(error, reply) {
          if(error) { return callback(error); }

          var friends = reply.ids
            , target  = randIndex(friends);

          T.post('friendships/create', { id: target }, callback);
        })
    })
};


  // .................. prune your followers list; unfollow a friend that hasn't followed you back
let prune = function () {
  let callback = function(page, error, status){
    console.log('error',error)
    console.log('page',page)
    console.log('status',status)
  }

  T.get('followers/ids', function(error, reply) {
      if(error) return callback(error);

      var followers = reply.ids;

      T.get('friends/ids', function(error, reply) {
          if(error) return callback(error);

          var friends = reply.ids
            , pruned = false;

          while(!pruned) {
            var target = randIndex(friends);

            if(!~followers.indexOf(target)) {
              pruned = true;
              T.post('friendships/destroy', { id: target }, callback);
            }
          }
      });
  });
}
  // .................. choose a random friend of one of your followers, and follow that user
let search = function () {
  let callback = function(error, data) {
    if (error) {
      console.log(error)
    } else {
      for (var i = 0; i < data.length ; i++) {
        console.log(data[i].text);
      }
    }
  }

  let options = { screen_name: ME,
                count: 1 }

  T.get('statuses/user_timeline', options , callback)

}


  // .................. post eon
let posteon = function(media = './eon-zz-101a-img.jpg', alttext = 'img text', status = 'tweet text') {
  var b64content = fs.readFileSync(media, { encoding: 'base64' })
  
  
      T.post('media/upload', { media_data: b64content }, function (page, error, status) { /* post the media to Twitter*/
       
if (1 && 1) console.log('page', page)
if (1 && 1) console.log('error', error)
if (1 && 1) console.log('status', status)


        // page null
        // error { message: 'Sorry, that page does not exist', code: 34 }
        // status 404
       
        // var mediaIdStr = data.media_id_string
        // var altText = alttext
        // var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } } /* assign alt text to the media */

        // T.post('media/metadata/create', meta_params, function (page, error, status) {
          // if (!error) { /* reference the media and post a tweet (media will attach to the tweet) */
            
            // var params = { status: status, media_ids: [mediaIdStr] }

            // T.post('statuses/update', params, function (page, error, status) {
              // console.log(data)
            // })
          // }
        // })
      })
}

  // .................. do
console.log('action', action, pars)
if (action === 'credentials') credentials() // account/verify_credentials
if (action === 'stream') stream(...pars)  // statuses/filter
if (action === 'followerspaged') followers(...pars)  // followers/ids
if (action === 'followers') followers(...pars)  // followers/ids
if (action === 'get') get(...pars)  // statuses/show
if (action === 'search') search(...pars)  // statuses/user_timeline
if (action === 'posteon') posteon(...pars)  // media/upload




