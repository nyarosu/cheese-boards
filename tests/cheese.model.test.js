const Cheese = require('../models/cheese.model.js')
const db = require('../db/db.js')

async function seed() {
    await db.sync();
}

describe('Testing the cheese model', () => {
    test('Data is created and read correctly', async () => {

        seed()
        let expected_title = "Wensleydale & Cranberry Cheese"
        let expected_description = "Described as 'sweet & fruity', creamy, crumbly Yorkshire Wensleydale cheese is carefully combined with the delicate fruity succulence of sweet cranberries. It's a delicious and versatile cheese perfect for snacking, nibbling, and both sweet and savoury cooking too!"

        await Cheese.create({ title: expected_title, 
        description: expected_description})

        const wensleydalecranberry = await Cheese.findOne({ where: { title: expected_title}})
            
        expect(wensleydalecranberry).toEqual(expect.anything())
        expect(wensleydalecranberry['title']).toEqual(expected_title)
        expect(wensleydalecranberry['description']).toEqual(expected_description)

    })
})
