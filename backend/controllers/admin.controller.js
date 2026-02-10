const usersService = require('../services/users.service');

async function getAllUsers(req, res) {
    const users = await usersService.findAll();
    res.json(users);
}

async function deleteUser(req, res) {
    const {id} = req.params;
    await usersService.deleteById(id);
    res.json({ success: true });
}

module.exports = {getAllUsers, deleteUser};