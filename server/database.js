const Pool = require('pg').Pool;

var config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: true
}

const pool = new Pool(config);

module.exports = pool;