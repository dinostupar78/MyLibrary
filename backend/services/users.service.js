const db = require("../library");

function findByUsername(username) {
    return db.oneOrNone(
        "SELECT * FROM users WHERE username = $1",
        [username]);
}

function createUser({ username, name, email, password_hash, salt }) {
    return db.one(
        `
            INSERT INTO users (username, name, email, password_hash, salt)
            VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username, name, email, user_role, user_image_url, created_at
        `,
        [username, name, email, password_hash, salt]
    );
}


module.exports = {findByUsername, createUser};