var db = require("../models/index");

module.exports = function (app) {


    // app.get("/", function (req, res) {
    //     db.Articles.find({}, function (dbArticles) {
    //         db.Notes.find({}, function (dbNotes){
    //             return res.render("index", 
    //             {
    //                 Article: dbArticles,
    //                 Note: dbNotes
    //             });
    //         });
    //     });
    // });

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
};
