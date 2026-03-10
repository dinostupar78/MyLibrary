const usersService = require('../repositories/users.repository');

async function getAllUsers(req, res) {
    const users = await usersService.findAll();

    const filtered = users.filter(user => user.role !== 'admin');
    res.json(filtered);
}

async function deleteUser(req, res) {
    const {id} = req.params;
    if(req.user.sub === req.params.id) {
        return res.status(400).json({ message: "You can't delete yourself" });
    }

    await usersService.deleteById(id);
    res.json({ success: true });
}

module.exports = {getAllUsers, deleteUser};