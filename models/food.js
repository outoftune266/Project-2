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
            type: DataTypes.DECIMAL(17,14),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(17,14),
            allowNull: false
        },
        familyFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mustTry: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Restaurant
};
