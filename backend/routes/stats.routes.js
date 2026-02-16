const router = require("express").Router();
const { getStats, getTopBooks} = require("../controllers/stats.controller");

router.get("/", getStats);
router.get('/top-books', getTopBooks);


module.exports = router;
