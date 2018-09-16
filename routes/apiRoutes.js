var cheerio = require("cheerio");
var request = require("request");

var db = require("../models/index");

//scraper 
module.exports = function (app) {

app.get("/scrape", function (req, res) {
    request("https://www.brewbound.com/", function (err, response, html) {
        //call cheerio with a $
        var $ = cheerio.load(html);

        //select the element from the body, brewbound uses a h3 tag to contain the title and link
        $("h3").each(function (i, element) {
            var result = {};
            var title = $(element).children().text();
            var link = $(element).children().attr("href")

            result.push({
                title: title,
                link: link
            });

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle)
                })
                .catch(function (err) {
                    return res.json(err)
                })
        });

        //if this could be brought in that would be great. 
        // $("picture").each(function (i, element) {
        //     var img = $(element).children().attr("srcset");
        // var link = $(element).parent().attr("href");
        // });
        res.send("Scrape Complete")
    });
    res.send("Scrape Complete")
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
        })
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err)
        });
});

}