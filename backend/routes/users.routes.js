const router = require("express").Router();
const {requireAuth} = require("../middleware/auth.middleware");
const {getMyProfile, updateProfile, updateAvatar} = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");


router.get("/me", requireAuth, getMyProfile);
router.put("/me", requireAuth, updateProfile);
router.put("/me/avatar", requireAuth, upload.single("avatar"), updateAvatar);
