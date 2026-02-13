const db = require("../library");

function getStats() {
    return db.one(`
        SELECT
            (SELECT COUNT(*) FROM books) AS "totalBooks",
            (SELECT COUNT(*) FROM genres) AS "totalGenres",
            (SELECT COUNT(*) FROM users) AS "totalUsers",
            (SELECT COALESCE(SUM(available_copies), 0) FROM books) AS "availableCopies"
    `);
}

module.exports = {getStats};
