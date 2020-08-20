const options = {
    debug: true,
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        password: 'postgres',
        user: 'postgres',
        port: '5434',
        database: 'postgres'
    }
}

module.exports = require('knex')(options);