const db = require("../library");

function findGenreByName(name) {
    return db.oneOrNone(
        "SELECT id FROM genres WHERE LOWER(name) = LOWER($1)",
        [name]
    );
}

function createGenre(name) {
    return db.one(
        "INSERT INTO genres (name) VALUES ($1) RETURNING id",
        [name]
    );
}

function createBook(book) {
    return db.one(`
        INSERT INTO books
        (title, author, description, image_url, genre_id, total_copies, available_copies)
        VALUES ($1,$2,$3,$4,$5,$6,$6)
            RETURNING *
    `, [
        book.title,
        book.author,
        book.description,
        book.image_url,
        book.genreId,
        book.total_copies
    ]);
}

module.exports = {
    findGenreByName,
    createGenre,
    createBook
};