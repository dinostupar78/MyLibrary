const db = require("../library");

function findAll() {
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
    title, author, description, image_url, isbn, published_year,
    google_books_id, genre_id, total_copies, available_copies
}) {
    return db.one(`
    UPDATE books
    SET title = $1, author = $2, description = $3, image_url = $4,  isbn = $5, published_year = $6,
      google_books_id = $7, genre_id = $8, total_copies = $9, available_copies = $10
    WHERE id = $11
    RETURNING *`, [title, author, description, image_url, isbn, published_year,
        google_books_id, genre_id, total_copies, available_copies, id]);
}




function deleteBook(id) {
    return db.none(`DELETE FROM books WHERE id = $1`, [id]);
}

module.exports = {findAll, findById, createBook, updateBook, deleteBook};