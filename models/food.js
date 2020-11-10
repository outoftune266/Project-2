// Creating our User model
module.exports = function (sequelize, DataTypes) {
    let Restaurant = sequelize.define("Restaurant", {
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cuisine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        familyFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mustTry: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });
    return Restaurant
};
