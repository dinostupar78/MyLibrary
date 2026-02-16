const db = require("../library");

function findAll() {
    return db.any(`
        SELECT l.id,
               l.borrow_date,
               l.return_date,
               l.status,
               u.username,
               b.title
        FROM loans l
                 JOIN users u ON l.user_id = u.id
                 JOIN books b ON l.book_id = b.id
        ORDER BY l.borrow_date DESC
    `);
}

function findByUser(userId) {
    return db.any(`
        SELECT l.id,
               l.borrow_date,
               l.return_date,
               l.status,
               b.title
        FROM loans l
                 JOIN books b ON l.book_id = b.id
        WHERE l.user_id = $1
        ORDER BY l.borrow_date DESC
    `, [userId]);
}

function findById(id) {
    return db.oneOrNone(
        `SELECT * FROM loans WHERE id = $1`,
        [id]
    );
}

function findActiveLoan(userId, bookId) {
    return db.oneOrNone(`
        SELECT * FROM loans
        WHERE user_id = $1
        AND book_id = $2
        AND status = 'borrowed'
    `, [userId, bookId]);
}

function createLoan(userId, bookId, borrowDate, returnDate) {
    return db.one(`
        INSERT INTO loans (borrow_date, return_date, status, user_id, book_id)
        VALUES ($1, $2, 'borrowed', $3, $4)
            RETURNING *
    `, [borrowDate, returnDate, userId, bookId]);
}



function markAsReturned(id) {
    return db.none(`
        UPDATE loans
        SET status = 'returned',
            return_date = CURRENT_DATE
        WHERE id = $1
    `, [id]);
}

module.exports = {
    findAll,
    findByUser,
    findById,
    findActiveLoan,
    createLoan,
    markAsReturned
};
