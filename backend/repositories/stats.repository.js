const db = require("../library");

function getStats() {
    return db.one(`
        SELECT
                (SELECT COUNT(*) FROM books) AS "totalBooks",
                (SELECT COUNT(*) FROM genres) AS "totalGenres",
                (SELECT COUNT(*) FROM users) AS "totalUsers",
                (SELECT COALESCE(SUM(available_copies),0) FROM books) AS "availableCopies",
                (SELECT COUNT(*) FROM loans WHERE status = 'borrowed') AS "borrowedBooks",
                (SELECT COUNT(*) FROM loans WHERE status = 'returned') AS "returnedBooks"
    `);
}

function getTopBorrowedBooks() {
    return db.any(`
        SELECT
            b.id,
            b.title,
            b.author,
            b.image_url,
            g.name AS genre_name,
            COUNT(l.id) AS borrow_count
        FROM books b
                 LEFT JOIN loans l
                           ON l.book_id = b.id
                 LEFT JOIN genres g
                           ON g.id = b.genre_id
        GROUP BY
            b.id,
            b.title,
            b.author,
            b.image_url,
            g.name
        ORDER BY borrow_count DESC
            LIMIT 3
    `);
}



module.exports = {getStats, getTopBorrowedBooks};
