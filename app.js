// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const fs = require("fs");
const _ = require("lodash");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


const songs = [];
var currSong = 0;
const audioFolder = fs.readdirSync("public/audio");

for (var i = 0; i < audioFolder.length; i++) {
    songs.push(audioFolder[i]);
}
// console.log(songs.length);

app.get("/", (req, res) => {
    // console.log(currSong, songs[currSong]);
    res.render("home", { song: songs[currSong], songName: songs[currSong], play: 'play'});
});


app.post("/", (req, res) => {
    const id = req.body.nav;
    const tp = req.body.nav;
    console.log(tp);
    if (id == 'pause') {
        res.render("home", { song: songs[currSong], songName: songs[currSong], play: 'play'});
    }
    else {
        if (id == 'next') {
            currSong = (currSong + 1) % songs.length;
            res.redirect("/");
        } else if (id == 'prev') {
            currSong = (songs.length + currSong - 1) % songs.length;
            res.redirect("/");
        }
        else if (id == 'play'){
            res.render("home", { song: songs[currSong], songName: songs[currSong], play: 'pause'});
        }
    }
});







app.listen(3000, () => {
    console.log("Listening on port 3000!");
})