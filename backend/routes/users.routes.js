const router = require("express").Router();
const {requireAuth} = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {getMyProfile, updateProfile, updateAvatar} = require("../controllers/users.controller");


router.get("/me", requireAuth, getMyProfile);
router.put("/me", requireAuth, updateProfile);
router.put("/me/avatar", requireAuth, upload.single("avatar"), updateAvatar);

module.exports = router;