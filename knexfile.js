const path = require('path');
require('dotenv').config()


module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname, 'database', 'migrations')
        }
    },

};