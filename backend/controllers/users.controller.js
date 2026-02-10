const usersService = require("../services/users.service");

async function getMyProfile(req, res) {
    const userId = req.user.sub;
    const user = await usersService.findById(userId);
    res.json(user);
}

async function updateProfile(req, res) {
    const userId = req.user.sub;
    const {name, email} = req.body;

    const updatedUser = await usersService.updateProfile(userId, {name, email});
    res.json(updatedUser);

}

async function updateAvatar(req, res) {
    const userId = req.user.sub;

    if (!req.file) {
        return res.status(400).json({ message: "Avatar file required" });
    }

    const imageUrl = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await usersService.updateAvatar(userId, imageUrl);
    res.json(updatedUser);
}


module.exports = {getMyProfile, updateProfile, updateAvatar};