const db = require("../library");

function findByUsername(username) {
    return db.oneOrNone(
        "SELECT * FROM users WHERE username = $1",
        [username]);
}

function createUser({username, name, email, password_hash, salt, user_image_url}) {
    return db.one(
        `
            INSERT INTO users (username, name, email, password_hash, salt, user_image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, username, email, user_role, user_image_url`,
        [username, name, email, password_hash, salt, user_image_url]);
}

module.exports = {findByUsername, createUser};