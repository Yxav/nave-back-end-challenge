import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { JWT_KEY } from '../config'

export const GenerateToken = data => {
    jwt.sign(data, JWT_KEY)
}

export const encryptPassword = password => 
    bcrypt.hash(password, 10)