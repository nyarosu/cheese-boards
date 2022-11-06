const Board = require('../models/board.model.js')
const db = require('../db/db.js')

async function seed() {
    await db.sync();
}

describe('Testing the Board model', () => {
    test('Data is created and read correctly', async () => {

        seed()
        let expected_type = "Game"
        let expected_description = "Monopoly is a real-estate board game for two to eight players"
        let expected_rating = 10

        await Board.create({ type: expected_type, 
        description: expected_description, rating: expected_rating})

        const me = await Board.findOne({ where: { type: expected_type, description: expected_description}})
            
        expect(me).toEqual(expect.anything())
        expect(me['type']).toEqual(expected_type)
        expect(me['description']).toEqual(expected_description)
        expect(me['rating']).toEqual(expected_rating)

    })
})
