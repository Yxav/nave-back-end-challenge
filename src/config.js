import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

export const DATABASE = process.env.DB_URL
export const DATABASE_TEST = process.env.DB_URL_TEST
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const JWT_KEY = process.env.SECRET_KEY 
