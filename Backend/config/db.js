const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dbuser',
    password: '4121',
    port: 5432,
});

module.exports = pool;