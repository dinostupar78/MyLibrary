const pgp = require("pg-promise")();
const config = require("./config");

const db = pgp({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
});

module.exports = db;