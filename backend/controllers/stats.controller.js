const statsService = require("../repositories/stats.repository");

async function getStats(req, res) {
    try {
        const stats = await statsService.getStats();
        res.status(200).json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
}

async function getTopBooks(req, res) {
    try {
        const books = await statsService.getTopBorrowedBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch top books" });
    }
}



module.exports = {getStats, getTopBooks};
