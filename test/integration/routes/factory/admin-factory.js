import Admin from 'models/Admin'

import { encryptPassword, generateToken } from 'helpers'

const adminFactory = async() => {
    const password = '123test345'
    const user = await Admin.query().insert({
        email: 'teste@teste.com',
        password: await encryptPassword(password)
    })

    const parsedUser = user.toJSON()

    return {
        ...parsedUser,
        password,
        token: `Bearer ${generateToken({
            id: parsedUser.id,
            email: parsedUser.email
        })}`
   }
}

export default adminFactory
