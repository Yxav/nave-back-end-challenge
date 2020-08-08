const db = require('../database/db')
const { async } = require('validate.js')


exports.createNaver = async(data) => {
    return await db('navers').insert(data, 'id')
}

exports.createProjectNaver = async(data) => {
    await db('project_navers').insert(data)

}

exports.index = async(data) => {
    return await db('navers')
        .select('id', 'name', 'birth_date', 'admission_date', 'job_role')
        .where(data);
}

exports.show = async(data) => {
    return await db('navers')
        .select('id', 'name', 'birth_date', 'admission_date', 'job_role')
        .where(data)
        .first()
}

exports.showProject = async(data) => {
    return await db('project_navers')
        .select('id_project')
        .where(data)

}

exports.update = async(data) => {
    return
    await db('navers')
        .where(data.id)
        .update(data.content, 'id')
}

exports.updateProject = async(data) => {
    await db('project_navers')
        .where(data.condition)
        .update(data.context)

}

exports.delete = async(data) => {
    await db('navers')
        .where(data)
        .first()
        .delete()
}