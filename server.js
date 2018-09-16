var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3005;

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
mongoose.connect("mongodb://localhost/brewScrapeDB");


// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



//scraper 
// can probably delete this, once I get handlebars working

// app.get("/scrape", function (req, res) {
//     request("https://www.brewbound.com/", function (err, response, html) {
//         //call cheerio with a $
//         var $ = cheerio.load(html);

//         //select the element from the body, brewbound uses a h3 tag to contain the title and link
//         $("h3").each(function (i, element) {
//             var results = [];
//             var title = $(element).children().text();
//             var link = $(element).children().attr("href")

//             results.push({
//                 title: title,
//                 link: link
//             });
//             console.log(results)
//             db.Article.create(results)
//                 .then(function (dbArticle) {
//                     console.log(dbArticle)
//                     res.json(dbArticle)
//                 });
//         });
        
//     });
// });

// app.get("/articles", function (req, res) {
//     db.Article.find({})
//         .then(function (dbArticle) {
//             res.json(dbArticle)
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.get("/articles/:id", function (req, res) {
//     db.Article.findOne({ _id: req.params.id })
//         .populate("note")
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.post("/articles/:id", function (req, res) {
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle)
//         })
//         .catch(function (err) {
//             res.json(err)
//         });
// });



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
