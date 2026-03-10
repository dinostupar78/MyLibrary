const usersService = require("../repositories/users.repository");

async function getMyProfile(req, res) {
    try{
        const userId = req.user.sub;
        const user = await usersService.findById(userId);
        res.status(201).json(user);

    } catch(err){
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
}

async function updateProfile(req, res) {
    try{
        const userId = req.user.sub;
        const {name, email} = req.body;

        const updatedUser = await usersService.updateProfile(userId, {name, email});
        res.status(201).json(updatedUser);

    } catch(err){
        res.status(500).json({ message: 'Failed to update profile' });
    }

}

async function updateAvatar(req, res) {
    try{
        const userId = req.user.sub;

        if (!req.file) {
            return res.status(400).json({ message: "Avatar file required" });
        }

        const imageUrl = `/uploads/avatars/${req.file.filename}`;

        const updatedUser = await usersService.updateAvatar(userId, imageUrl);
        res.status(201).json(updatedUser);

    } catch(err){
        res.status(500).json({ message: 'Failed to update avatar' });
    }
}


module.exports = {getMyProfile, updateProfile, updateAvatar};