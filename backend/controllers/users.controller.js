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
    const {image_url} = req.body;

    const updatedAvatar = await usersService.updateAvatar(userId, image_url);
    res.json(updatedAvatar);
}

module.exports = {getMyProfile, updateProfile, updateAvatar};