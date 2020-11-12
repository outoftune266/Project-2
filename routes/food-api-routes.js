// Requiring our models
const db = require("../models");
const { Op } = require("sequelize")

module.exports = function (app) {


    
    app.get("/api/food", function (req, res) {
        let coordinates = req.query;
        //console.log(coordinates);
        let query = {
            latitude: {
                [Op.between]: [coordinates.minLat, coordinates.maxLat]
            },
            longitude: {
                [Op.between]: [coordinates.minLng, coordinates.maxLng]
            }
        };
        db.Restaurant.findAll({
            limit: 20,
            where: query,
        }).then(function (dbPost) {
            console.log(dbPost);
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
