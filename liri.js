require("dotenv").config();
var request=require("request");
var keys=require("./keys.js");
// console.log(keys);
var Spotify=require("node-spotify-api");
var Twitter=require("twitter");
var spotify=new Spotify(keys.spotify);
var client=new Twitter(keys.twitter);
var command=process.argv[2];
var name="";
for(var i=3;i<process.argv.length;i++){
    name+=(process.argv[i]+" ");
}
// console.log(name);
// console.log(command);
if(name=="my-tweets"){
    
}
else if(name=="spotify-this-song"){

}
else if(name=="movie-this"){

}
else if(name=="do-what-it-says"){

}