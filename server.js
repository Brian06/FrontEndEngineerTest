var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');


app = express();
app.use(bodyParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//remove this when deploy,use just on development
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 3001;
require('./server/routes')(app);
app.listen(port);
console.log('server started '+ port);
