const { Model, DataTypes } = require('sequelize')
const db = require('../db/db')

class Cheese extends Model { }

Cheese.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { sequelize: db })

module.exports = Cheese