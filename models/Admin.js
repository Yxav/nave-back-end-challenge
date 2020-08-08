const db = require('../database/db')


exports.create = async(data) => {
    console.log(data)
    await db('admins').insert(data)
}

exports.checkUser = async(data) => {
    return await db('admins')
        .where(data)
        .first()
}