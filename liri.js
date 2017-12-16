// Store dependencies as variables
var keys = require('./keys.js');
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

//Capture user input, and inform user of what to type in
// console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started.");

var cmdOne = process.argv[2];
var cmdTwo = process.argv[3];

//Process multiple words. Triggers if user types anything more than the above console logged options 
// and first parameter
for (i = 4; i < process.argv.length; i++) {
    cmdTwo += '+' + process.argv[i];
}

function switchStmt() {
    //action statement, switch statement to declare what action to execute
    switch (cmdOne) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotifyThis();
            break;

        case 'movie-this':
            movieThis();
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;

        default:
            console.log('LIRI doesn\'t know that');
    }
}

// ** Twitter **
//functions to pull last 20 tweets
function myTweets() {
    console.log("Retrieving tweets");
    //new variable for instance of twitter, load keys from imported keys.js
    var client = new twitter({
        consumer_key: 'keys.twitterKeys.consumer_key',
        consumer_secret: 'keys.twitterKeys.consumer_secret',
        access_token_key: 'keys.twitterKeys.access_token_key',
        access_token_secret: 'keys.twitterKeys.access_token_secret'
    });

    //parameters for twitter function
    var params = {
        screen_name: 'coder491',
        count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' +
                    tweets[i].text + '\n');
                console.log(returnedData);
                console.log("-------------------------");
            }
        };
    });
}; //end myTweets;

// ** Spotify **
function spotifyThis() {
    console.log("Retrieving song info");
    // variable for search term, test if defined
    var search;
    if (cmdTwo === undefined) {
        search = "The Sign";
    } else {
        search = cmdTwo;

        var spotify = new Spotify({
            id: '82e59bccdec2482f92c3ba6427272650',
            secret: '7a03d1acbcb34976bc7addd26d87e307'
        });

        spotify
            .search({ type: 'track', query: search })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    //launch spotify search
    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });
}; //end spotifyThis

function movieThis() {
    console.log("What's playing?");

    //same as above, test if search term entered
    var searchMovie;
    if (cmdTwo === undefined) {
        searchMovie = "Mr. Nobody";
    } else {
        searchMovie = cmdTwo;
    };

    var url = "http://www.omdbapi.com/?t=" + searchMovie + "&plot=long&tomatoes=true&r=json&apikey=40e9cece&y";
    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
        }
    });
}; //end movieThis

function doWhatItSays() {
    console.log("Looking at random.txt now");
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {

            //split data, declare variables
            var dataArr = data.split(',');
            cmdOne = dataArr[0];
            cmdTwo = dataArr[1];
            //if multi-word search term, add
            for (i = 2; i < dataArr.length; i++) {
                cmdTwo = cmdTwo + "+" + dataArr[i];
            };
            //run action
            switchStmt();

        }; //end else

    }); //end readfile

}; //end doWhatItSays

switchStmt();