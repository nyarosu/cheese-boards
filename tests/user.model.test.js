const User = require('../models/user.model.js')
const db = require('../db/db.js')

async function seed() {
    await db.sync();
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
})
