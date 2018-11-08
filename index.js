// Use our Watson library.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var Twitter = require('twit');

// Require our config variables.
var config = require('./config');

// The text that we want to analyze the tone of.
var text = "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. \“Whenever you feel like criticizing any one,\” he told me, \“just remember that all the people in this world haven’t had the advantages that you’ve had.\"";



var array = [];

// Initialize the Tone Analyzer by giving it our credentials.
var tone_analyzer = new ToneAnalyzerV3(
        {
        username: config.toneAnalyzer_username,
        password: config.toneAnalyzer_password,
        version_date: '2017-09-21'
        });

var twitterClient = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_SECRET
});

var params1 = {
    q: 'nike',
    count: 5,
    result_type: 'recent',
    lang: 'en'
}
var tweet;

twitterClient.get('search/tweets', params1, function(err,data, response){
    if (!err){
        console.log("tweets");
        for (let i = 0; i < data.statuses.length; i++)
         {
            //console.log(data.statuses[i]);
            tweet = {"text": data.statuses[i].text};          
            console.log("_____TWEETS_____");
            console.log(data.statuses[i].text);
// The format that the tone analyzer needs. 
var params = 
        {
        'tone_input': tweet,
        'content_type': 'application/json'
        };

        callToneAnalyzer(params);   
        } 
    }
    else{
        console.log('error');
    }
});


function callToneAnalyzer(tweets)
{
//Use our Tone Analyzer variable to analyze the tone.
tone_analyzer.tone(tweets, function(error, response) 
        {
        // There's an error.
        if (error)
                {
                console.log('Error:', error);
                }
        // No error, we got our tone result.
        else
                {
                // The tone of the text, as determined by watson.
                var tone = JSON.stringify(response, null, 2)
                
                // Output Watson's tone analysis to the console.
                console.log("The tone analysis for \'" + tweets.text + "\' is:\n");
                 console.log(response.document_tone);
                
                }
        });
}


// Turn our text into valid json.
//var input = { "text": text };
