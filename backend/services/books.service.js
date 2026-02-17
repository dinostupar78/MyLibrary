const db = require("../library");

function findAll(genreId) {
    if (genreId) {
        return db.any(`
            SELECT b.*, g.name as genre_name
            FROM books b
            LEFT JOIN genres g ON b.genre_id = g.id
            WHERE b.genre_id = $1
            ORDER BY b.created_at DESC
        `, [genreId]);
    }

    return db.any(`
        SELECT b.*, g.name as genre_name
        FROM books b
                 LEFT JOIN genres g ON b.genre_id = g.id
        ORDER BY b.created_at DESC
    `);
}


function findById(id) {
    return db.oneOrNone(`
        SELECT b.*, g.name as genre_name
        FROM books b
                 LEFT JOIN genres g ON b.genre_id = g.id
        WHERE b.id = $1
    `, [id]);
}

function createBook({ title, author, description, image_url, genre_id, total_copies }) {
    return db.one(`
        INSERT INTO books (
            title,
            author,
            description,
            image_url,
            genre_id,
            total_copies,
            available_copies
        )
        VALUES ($1,$2,$3,$4,$5,$6,$6)
            RETURNING *
    `, [
        title,
        author,
        description,
        image_url,
        genre_id,
        total_copies
    ]);
}


function updateBook(id, {
    title,
    author,
    description,
    image_url,
    genre_id,
    total_copies
}) {
    return db.one(`
        WITH borrowed_count AS (
            SELECT COUNT(*) AS borrowed
            FROM loans
            WHERE book_id = $1 AND status = 'borrowed'
        )

        UPDATE books
        SET
            title = $2,
            author = $3,
            description = $4,
            image_url = $5,
            genre_id = $6,
            total_copies = $7,
            available_copies = $7 - (SELECT borrowed FROM borrowed_count)
        WHERE id = $1
            RETURNING *
    `, [
        id,
        title,
        author,
        description,
        image_url,
        genre_id,
        total_copies
    ]);
}

function deleteBook(id) {
    return db.result(`DELETE FROM books WHERE id = $1`, [id]);
}

function increaseAvailableCopies(bookId) {
    return db.none(`
        UPDATE books
        SET available_copies = available_copies + 1
        WHERE id = $1
    `, [bookId]);
}

function decreaseAvailableCopies(bookId) {
    return db.none(`
        UPDATE books
        SET available_copies = available_copies - 1
        WHERE id = $1
    `, [bookId]);
}


module.exports = {findAll, findById, createBook, updateBook, deleteBook, increaseAvailableCopies, decreaseAvailableCopies};