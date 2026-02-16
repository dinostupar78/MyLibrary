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

function createBook({title, author, description, image_url, isbn, published_year,
                        google_books_id, genre_id, total_copies
                    }) {
    return db.one(`
        INSERT INTO books (title, author, description, image_url, isbn, published_year, 
                           google_books_id, genre_id, total_copies, available_copies
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9)
            RETURNING *`, [title, author, description, image_url, isbn, published_year,
        google_books_id, genre_id, total_copies]);
}

function updateBook(id, {
    title,
    author,
    description,
    image_url,
    isbn,
    published_year,
    google_books_id,
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
            isbn = $6,
            published_year = $7,
            google_books_id = $8,
            genre_id = $9,
            total_copies = $10,
            available_copies = $10 - (SELECT borrowed FROM borrowed_count)
        WHERE id = $1
            RETURNING *
    `, [
        id,
        title,
        author,
        description,
        image_url,
        isbn,
        published_year,
        google_books_id,
        genre_id,
        total_copies
    ]);
}



function deleteBook(id) {
    return db.result(`DELETE FROM books WHERE id = $1`, [id]);
}

module.exports = {findAll, findById, createBook, updateBook, deleteBook};