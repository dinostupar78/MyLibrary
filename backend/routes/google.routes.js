const router = require("express").Router();
const axios = require("axios");
const {requireAuth} = require("../middleware/auth.middleware");
const {requireAdmin} = require("../middleware/admin.middleware");
const {searchGoogleBooks, importBookFromGoogle} = require("../controllers/google.controller");

router.get("/search", requireAuth, searchGoogleBooks);
router.post("/import", requireAuth, requireAdmin, importBookFromGoogle);

module.exports = router;