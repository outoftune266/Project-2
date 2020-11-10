// Creating our User model
module.exports = function (sequelize, DataTypes) {
    let Entertainment = sequelize.define("Entertainment", {
        activityType: {
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
    });
    return Entertainment
};
