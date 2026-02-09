const router = require("express").Router();
const {register, login} = require("../../services/auth.service");
const {requireAuth} = require("../../middleware/auth.middleware");
const {me} = require("../../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);


module.exports = router;


