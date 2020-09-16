const { Model } = require('objection')
const db = require('../database/db')

Model.knex(db)

class Admin extends Model {
    static get tableName(){
        return 'admins'
    }
}


module.exports = Admin
