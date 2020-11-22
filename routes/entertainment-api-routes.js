// Requiring our models
const db = require("../models");
const { Op } = require("sequelize");

module.exports = function (app) {
    app.get("/api/entertainment", function (req, res) {
        let coordinates = req.query;
        let query = {
            latitude: {
                [Op.between]: [coordinates.minLat, coordinates.maxLat]
            },
            longitude: {
                [Op.between]: [coordinates.minLng, coordinates.maxLng]
            }
        };
        db.Entertainment.findAll({
            limit: 20,
            where: query,
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
