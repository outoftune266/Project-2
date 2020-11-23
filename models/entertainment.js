// Creating our User model for future development
module.exports = function (sequelize, DataTypes) {
    let Entertainment = sequelize.define("Entertainment", {
        locationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
    });
    return Entertainment
};
