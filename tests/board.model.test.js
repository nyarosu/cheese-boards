
const { Board, Cheese, User } = require('../models')
const db = require('../db/db.js')

async function seed() {
    await db.sync({ force: true })
} 


describe('Testing the Board model', () => {
    test('Data is created and read correctly', async () => {

        seed()
        let expected_type = "French"
        let expected_description = "French cheeses. Matured over long periods."
        let expected_rating = 10

        await Board.create({ type: expected_type, 
        description: expected_description, rating: expected_rating})

        const me = await Board.findOne({ where: { type: expected_type, description: expected_description}})
            
        expect(me).toEqual(expect.anything())
        expect(me['type']).toEqual(expected_type)
        expect(me['description']).toEqual(expected_description)
        expect(me['rating']).toEqual(expected_rating)

    })

    test('Boards and Cheese are correctly associated', async () => {
        let board1 = await Board.create({ type: "French", description: "French cheeses. Matured over long periods.", rating: 10})
        let board2 = await Board.create({ type: "German", description: "Germany produces all types of cheeses, including Hard Cheese (Hartkäse), Semi-Hard Cheese (Schnittkäse), Semi-Soft Cheese (Halbfester Schnittkäse), Soft Cheese (Weichkäse) and Fresh Cheese (Frischkäse)", rating: 8})

        let cheese1 = await Cheese.create({title: "Wensleydale & Cranberry Cheese", description: "Described as 'sweet & fruity', creamy, crumbly Yorkshire Wensleydale cheese is carefully combined with the delicate fruity succulence of sweet cranberries. It's a delicious and versatile cheese perfect for snacking, nibbling, and both sweet and savoury cooking too!"})
        let cheese2 = await Cheese.create({title: "Cheddar", description: "The texture is slightly buttery, moist, and a little melty. It's truly a versatile crowd-pleaser."})

        board1.addCheese(cheese1)
        board1.addCheese(cheese2)

        cheese1.addBoard(board1)
        cheese2.addBoard(board2)

    })
})
