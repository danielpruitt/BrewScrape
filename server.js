var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3005;

//require all models
var db = require("./models");

// // Initialize Express
var app = express();

// // Use morgan logger for logging requests
app.use(logger("dev"));
// // Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//set Handlebars
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars")

// // Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/brewScrapeDB";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
