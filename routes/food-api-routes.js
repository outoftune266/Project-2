

// Requiring our models
const db = require("../models");

module.exports = function (app) {


    i
    app.get("/api/food", function (req, res) {
        let query = {};
        db.Food.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });

    });



  
    app.post("/api/food", function (req, res) {
        db.Food.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });

    });


    app.delete("/api/food/:id", function (req, res) {
        db.Food.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    app.put("/api/food", function (req, res) {
        db.Food.update(
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
