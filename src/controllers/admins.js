import bcrypt from 'bcryptjs'

import Admin from 'models/Admin'

import { encryptPassword, generateToken } from 'helpers'

export const create = async ctx => {
    const { body } = ctx.request
    
    
    return Admin.query().insert({
        email: body.email,
        password: await encryptPassword(body.password)
    })   
}

export const login = async ctx => {
    const { body } = ctx.request
    const user = await Admin.query()
      .findOne({email: body.email})
      .catch(() => {
          throw console.error("ops, error")
      })

    const validPassword = await bcrypt.compare(body.password, user.password)
    if(!validPassword){
        throw console.error('Ooops, invalid password')
    }

    const userParsed = user.toJSON()
    
    return { 
        ...userParsed,
        token : generateToken({
            id: userParsed.id,
            email: userParsed.email
        })
    }

}

export default { 
    create,
    login
 }