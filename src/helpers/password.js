import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { JWT_KEY } from '../config'

export const generateToken = data => {
    return jwt.sign(data, JWT_KEY)
}

export const encryptPassword = (password, length = 10) => 
    bcrypt.hash(password, length)