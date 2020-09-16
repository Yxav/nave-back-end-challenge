const { Model } = require('objection')
const db = require('../database/db')


Model.knex(db)

class Project extends Model {
    static get tableName(){
        return 'projects'
    }
}

module.exports = Project










// exports.create = async(data) => {
//     return await db('projects').insert(data, 'id')
// }

// exports.createNaverProject = async(data) => {
//     await db('project_navers').insert(data)
// }

// exports.getNaverProject = async(data) => {
//     return await db('project_navers')
//         .select('id_naver')
//         .where(data)
// }


// exports.index = async(data) => {
//     return await db('projects')
//         .select('id', 'name')
//         .where(data)
// }

// exports.show = async(data) => {
//     return await db('projects')
//         .select('id', 'name')
//         .where(data)
//         .first()
// }

// exports.update = async(data) => {
//     return await db('projects')
//         .where(data.condition)
//         .update(data.context, 'id')
// }

// exports.delete = async(data) => {
//     await db('projects')
//         .where(data)
//         .first()
//         .delete()
// }