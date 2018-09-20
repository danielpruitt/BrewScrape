var cheerio = require("cheerio");
var request = require("request");

var db = require("../models/index");

//scraper 
module.exports = function (app) {
    // app.get("/api/fetch", function (req, res) {
    //     request("https://www.brewbound.com/", function (err, response, html) {
    //         //call cheerio with a $
    //         var $ = cheerio.load(html);

    //         //select the element from the body, brewbound uses a h3 tag to contain the title and link
    //         $("article.has-image").each(function (i, element) {
    //             var results = [];
    //             var $div = $(element).find("h3");
    //             var title = $div.children().text();
    //             var link = $div.children().attr("href")

    //             var $divSum = $(element).find("div.summary");
    //             var summary = $divSum.children().text();

    //             var $divImg = $(element).find("picture");
    //             var img = $divImg.children().attr("srcset");

    //             //results array will be pushed to the database
    //             results.push({
    //                 title: title,
    //                 link: link,
    //                 img: img,
    //                 summary: summary
    //             });

    //             db.Article.findOne({title: results.title}).then(function(dbArticle) {
    //                 if(dbArticle) {
    //                     console.log("Already exists in database");

    //                 } else {
    //                     db.Article.create(results).then(function(dbArticle) {
    //                         console.log(dbArticle);
    //                     });
    //                 };
    //             });

    //             //create each object in Results in the database
    //             // db.Article.create(results)
    //             //     .then(function (dbArticle) {
    //             //         console.log(dbArticle)
    //             //         res.json(dbArticle)
    //             //     });
    //         });
    //         res.send("scraped")
    //     });
    // });

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

    app.get("/api/fetch", function (req, res) {
        request("https://www.brewbound.com/", function (err, response, html) {
            //call cheerio with a $
            var $ = cheerio.load(html);

            //select the element from the body, brewbound uses a h3 tag to contain the title and link
            $("article.has-image").each(function (i, element) {
                var results = {};
                var $div = $(element).find("h3");
                var title = $div.children().text();
                var link = $div.children().attr("href")

                var $divSum = $(element).find("div.summary");
                var summary = $divSum.children().text();

                var $divImg = $(element).find("picture");
                var img = $divImg.children().attr("srcset");


                //results object will be pushed to the database
                results.title = title;
                results.link = link;
                results.summary = summary;
                results.img = img;

                db.Article.findOne({ title: results.title }).then(function (dbArticle) {
                    if (dbArticle) {
                        console.log("Already exists in database");

                    } else {
                        db.Article.create(results).then(function (dbArticle) {
                            console.log(dbArticle);
                        });
                    };
                });
            });
            res.json("scraped");
        });
    });


}