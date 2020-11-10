

// Requiring our models
const db = require("../models");

module.exports = function (app) {


    i
    app.get("/api/entertainment", function (req, res) {
        let query = {};
        db.Entertainment.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });

    });



  
    app.post("/api/entertainment", function (req, res) {
        db.Entertainment.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });

    });


    app.delete("/api/entertainment/:id", function (req, res) {
        db.Entertainment.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    app.put("/api/entertainment", function (req, res) {
        db.Entertainment.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });

};
