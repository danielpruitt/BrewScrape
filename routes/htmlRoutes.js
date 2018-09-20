var db = require("../models/index");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                return res.render("index", {
                    Article: dbArticles
                }).then(function (dbNotes) {
                    return res.render("index", {
                        Note: dbNotes
                    })
                });
            });
    });

    app.get("/notes", function (req, res) {
        db.Note.find({})
            .then(function (dbNotes) {
                return res.render("notes", {
                    Note: dbNotes
                })
            });
    });


    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                return res.render("articles", {
                    Article: dbArticles
                })
            });
    });

};
