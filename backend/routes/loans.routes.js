const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/admin.middleware");
const {getAllLoans, getLoansByUser, borrowBook, returnBook} = require("../controllers/loans.controller");

router.get("/", requireAuth, requireAdmin, getAllLoans);
router.get("/user/:id", requireAuth, getLoansByUser);
router.post("/", requireAuth, borrowBook);
router.put("/:id/return", requireAuth, returnBook);

module.exports = router;
