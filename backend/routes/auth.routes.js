const router = require("express").Router();
const {register, login, me} = require("../controllers/auth.controller");
const {requireAuth} = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");


router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/me", requireAuth, me);


module.exports = router;


