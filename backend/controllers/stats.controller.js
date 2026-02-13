const statsService = require("../services/stats.service");

async function getStats(req, res) {
    try {
        const stats = await statsService.getStats();
        res.status(201).json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
}

module.exports = {getStats};
