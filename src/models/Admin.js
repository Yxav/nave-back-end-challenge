import { Model, mixin } from 'objection'
import visibility from 'objection-visibility'
import Knex from 'knex'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from '../config'

const knex = Knex(knexConfig.test)

Model.knex(knex)


class Admin extends mixin (Model, visibility) {
    static get tableName() {
        return 'admins'
    }
    static get hidden() {
        return ['password']
      }

}

export default Admin

