require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
// console.log(keys);
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var name = "";
if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("error: "+error);
        }
        //console.log(data);
        command = data.substring(0, data.indexOf(","));
        name = data.substring((data.indexOf(",") + 2), (data.length - 1));
        console.log(command);
        console.log(name);
        run();
    })

}
else {
    for (var i = 3; i < process.argv.length; i++) {
        name += (process.argv[i] + " ");
        run();
    }
}

//name.trim();
// client
//     .get("account/verify_credentials",{})
//     .then(function(reply){
//         console.log(reply);
//     })
//     .catch(function(err){
//         console.log(err);
//     });
function run(){
if (command == "my-tweets") {
    client.get("statuses/user_timeline", { screen_name: "TestUnsell", count: 20 })
        .then(function (tweets) {
            // console.log(tweets);
            for (var j = 0; j < tweets.length; j++) {
                console.log("===========================");
                console.log(tweets[j].text);
                console.log("===========================");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
else if (command == "spotify-this-song") {
    if (name == "") {
        name = "The Sign";
    }
    spotify.search({ type: "track", query: name }, function (err, data) {
        if (err) {
            console.log(err);
        }
        for (var k = 0; k < data.tracks.items.length && k<3; k++) {
            console.log("===========================");

            var song = data.tracks.items[k];
            console.log(song.name);
            console.log(song.album.name);
            var artists = "";
            for (var l = 0; l < song.artists.length; l++) {
                artists += (song.artists[l].name + ", ");
            }
            artists.trim;
            console.log(artists);
            console.log(song.preview_url);
            console.log("===========================");
        }
    })
}
else if (command == "movie-this") {
    if (name == "") {
        name = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + name + "&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log(error);
        }
        console.log("===========================");
        //console.log(response.body);
        var movie = JSON.parse(response.body);
        console.log(movie.Title);
        console.log(movie.Year);
        console.log(movie.Rated);
        for (var m = 0; m < movie.Ratings.length; m++) {
            if (movie.Ratings[m].Source == "Rotten Tomatoes") {
                console.log("Rotten Tomatoes score: " + movie.Ratings[m].Value);
            }
        }
        console.log(movie.Country);
        console.log(movie.Language);
        console.log(movie.Plot);
        console.log(movie.Actors);
        // for(var m=0;m<response.body.length;m++){
        //     var movie=response.body[m];
        //     console.log(movie.Title);
        // }
        console.log("===========================");
    })
    
}
else{
    console.log("unknown command: "+command);
}
}