const Board = require('./board.model.js')
const Cheese = require('./cheese.model.js')
const User = require('./user.model.js')

User.hasMany(Board)
Board.belongsTo(User)

Cheese.belongsToMany(Board, { through: 'Board_Cheese' })
Board.belongsToMany(Cheese, { through: 'Board_Cheese' })



module.exports = { 
    Board,
    Cheese,
    User
}