const fs = require('fs');
var express = require("express");
const app = express();
var path = require("path");
const fetch = require('node-fetch');

// shhhh!!
const apiKey = fs.readFileSync('./hidden/key.txt', 'utf8').split("\n").shift();
const secret = fs.readFileSync('./hidden/secret.txt', 'utf8').split("\n").shift();
console.log('key is ' + apiKey);
console.log('secret is ' + secret);


var server = require("http").createServer(app);
var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log("Server listening at port %d", port);
});

app.use(express.static(path.join(__dirname, '../public')));
const getMapTest = async (req, res, next) => {
  const url = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA&key=" + apiKey;
  console.log(url)
  const x = await fetch(url);
  const img = await x.buffer();

  res.contentType('png');
  res.send(img);
}

// Serve photo
app.get('/test', getMapTest);

// Serve initial web page
//app.get('/', (req, res) => { res.sendFile('./public/index.html'); });

//app.get('/test',  (req, res) => { res.sendFile('./public/index.html'); });
