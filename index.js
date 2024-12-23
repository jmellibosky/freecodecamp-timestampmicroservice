// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", (req, res) => {
  if (req.params.date) {
    // parameter exists
    if (!isNaN(req.params.date)) {
      // parameter is number
      let millis = Number(req.params.date);
      let unixTime = new Date(millis).getTime();
      let utcTime = new Date(millis).toUTCString()

      res.json({unix: unixTime, utc: utcTime});
    } else {
      let inputDate = new Date(Date.parse(req.params.date));
      if (inputDate.toString() === "Invalid Date") {
        // parameter is not date
        res.json({error: "Invalid Date"});
      } else {
        // parameter is date
        res.json({unix: inputDate.getTime(), utc: inputDate.toUTCString()});
      }
    }
  } else {
    // parameter doesn't exist
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
  }
});
