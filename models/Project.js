const db = require('../database/db')

exports.create = async(data) => {
    return await db('projects').insert(data, 'id')
}

exports.createNaverProject = async(data) => {
    await db('project_navers').insert(data)
}

exports.index = async(data) => {
    return await db('projects')
        .select('id', 'name')
        .where(data)
}

exports.show = async(data) => {
    return await db('projects')
        .select('id', 'name')
        .where(data)
        .first()
}

exports.update = async(data) => {
    return await db('projects')
        .where(data.condition)
        .update(data.context, 'id')
}

exports.delete = async(data) => {
    await db('projects')
        .where(data)
        .first()
        .delete()
}