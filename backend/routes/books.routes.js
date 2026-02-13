const router = require("express").Router();
const {requireAuth} = require("../middleware/auth.middleware");
const {requireAdmin} = require("../middleware/admin.middleware");
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require("../controllers/books.controller");
const upload = require("../middleware/uploadBooks.middleware");

router.get("/", getAllBooks);
router.get("/:id", getBookById)
router.post("/", requireAuth, requireAdmin, upload.single("image"), createBook);
router.put("/:id", requireAuth, requireAdmin, updateBook);
router.delete("/:id", requireAuth, requireAdmin, deleteBook);

module.exports = router;