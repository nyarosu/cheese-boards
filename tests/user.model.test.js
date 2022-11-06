const { User, Board, Cheese } = require('../models')
const db = require('../db/db.js')

async function seed() {
    await db.sync({ force: true })
} 


describe('Testing the User model', () => {
    test('Data is created and read correctly', async () => {

        seed()
        let expected_name = "Ronak Chatterjee"
        let expected_email = "ronakc@meta.com"

        await User.create({ name: expected_name, 
        email: expected_email})

        const me = await User.findOne({ where: { name: expected_name}})
            
        expect(me).toEqual(expect.anything())
        expect(me['name']).toEqual(expected_name)
        expect(me['email']).toEqual(expected_email)

    })

    test('User and Boards are correctly associated', async () => {

        let me = await User.create({name: "Ronak Chatterjee", email: "ronakc@meta.com"})
        let frenchBoard = await Board.create({type: "French", description: "French cheeses. Matured over long periods.", rating: 10})
        let germanBoard = await Board.create({type: "German", description: "Germany produces all types of cheeses, including Hard Cheese (Hartkäse), Semi-Hard Cheese (Schnittkäse), Semi-Soft Cheese (Halbfester Schnittkäse), Soft Cheese (Weichkäse) and Fresh Cheese (Frischkäse)", rating: 8})

        me.addBoard(frenchBoard)
        me.addBoard(germanBoard)

        let myBoards = await me.getBoards() 
        
        expect(myBoards).toEqual(expect.anything())
        expect(myBoards[0]["type"]).toEqual("French")
        expect(myBoards[1]["type"]).toEqual("German")
    })
})
