const router = require("express").Router();
const {requireAuth} = require("../middleware/auth.middleware");
const {requireAdmin} = require("../middleware/admin.middleware");
const {getAllGenres, createGenre, updateGenre, deleteGenre} = require("../controllers/genres.controller");

router.get("/", getAllGenres);
router.post("/", requireAuth, requireAdmin, createGenre);
router.put("/:id", requireAuth, requireAdmin, updateGenre);
router.delete("/:id", requireAuth, requireAdmin, deleteGenre);

module.exports = router;