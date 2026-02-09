const router = require("express").Router();
const authService = require("./services/auth.service");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;


