var express = require("express");
var router= express.Router();
var mongoose = require("mongoose");
var request = require("request");

var db = require("../models/index");

//scraper 
apiRouter.get("/scrape", function (req, res) {
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
        // $("picture").each(function (i, element) {
        //     var img = $(element).children().attr("srcset");
        // var link = $(element).parent().attr("href");
        // });
        res.send("Scrape Complete")
    });
    res.send("Scrape Complete")
});

apiRouter.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err);
        });
});

apiRouter.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

apiRouter.post("/articles/:id", function (req, res) {
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

module.exports = apiRouter;