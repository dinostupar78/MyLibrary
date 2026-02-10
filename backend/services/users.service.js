const db = require("../library");

function findAll() {
    return db.any(`
        SELECT
            id,
            username,
            name,
            email,
            user_role AS role,
            user_image_url,
            created_at
        FROM users
        ORDER BY created_at DESC
    `);
}

function findById(id) {
    return db.oneOrNone(`
        SELECT
            id,
            username,
            name,
            email,
            user_role AS role,
            user_image_url,
            created_at
        FROM users
        WHERE id = $1
    `, [id]);
}

function findByUsername(username) {
    return db.oneOrNone(`
    SELECT id, username, name, email, password_hash, salt, user_role AS role, user_image_url
    FROM users
    WHERE username = $1
  `, [username]);
}

function createUser({ username, name, email, user_role, password_hash, salt, user_image_url }) {
    return db.one(`
        INSERT INTO users (username, name, email, user_role, password_hash, salt, user_image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, username, name, email, user_role AS role, user_image_url`,
        [username, name, email, user_role, password_hash, salt, user_image_url]);
}


function updateProfile(id, { name, email}){
    return db.one(`
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3
        RETURNING id, username, name, email, user_role AS role, user_image_url`,
        [name, email, id]);
}

function updateAvatar(id, imageUrl) {
    return db.one(`
        UPDATE users
        SET user_image_url = $1
        WHERE id = $2
            RETURNING id, username, name, email, user_role AS role, user_image_url`, [imageUrl, id]);
}

function deleteById(id) {
    return db.none(`DELETE FROM users WHERE id = $1`, [id]);
}


module.exports = {findAll, findById, findByUsername, createUser, updateProfile, updateAvatar, deleteById};