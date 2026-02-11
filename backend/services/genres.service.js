const db = require("../library");

function findAll() {
    return db.any(
        `SELECT id, name, created_at
                FROM genres
                ORDER BY name ASC`);
}

function findById(id){
    return db.oneOrNone(
        `SELECT id, name, created_at FROM genres WHERE id = $1`,
        [id]
    );
}

function findByName(name) {
    return db.oneOrNone(
        `SELECT id, name FROM genres WHERE LOWER(name) = LOWER($1)`,
        [name]
    );
}

function createGenre(name){
    return db.one(`INSERT INTO genres (name)
    VALUES ($1)
    RETURNING id, name, created_at`, [name]);
}

function updateGenre(id, name){
    return db.one(
        `UPDATE genres
    SET name = $1
    WHERE id = $2
    RETURNING id, name, created_at`, [name, id]);
}

function deleteById(id) {
    return db.result(`DELETE FROM genres WHERE id = $1`, [id], r => r.rowCount);
}

module.exports = {findAll, findById, findByName, createGenre, updateGenre, deleteById};
