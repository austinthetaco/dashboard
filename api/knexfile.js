

module.exports = {
    client: 'postgresql',
    seeds: {
        directory: './seeds/dev'
    },
    connection: {
        host: 'localhost',
        password: 'postgres',
        user: 'postgres',
        port: 5434,
        database: 'postgres'
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    }
};