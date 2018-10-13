const Pool = require('pg').Pool;

var config = {
    user: "memers",
    password: "urmomgay",
    host: "memers-hackumass.cqgrlz65ktas.us-east-1.rds.amazonaws.com",
    port: 5432,
    database: "memecurator",
    ssl: true
}

const pool = new Pool(config);

module.exports = pool;