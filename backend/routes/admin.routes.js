const router = require('express').Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/admin.middleware');
const {getAllUsers, deleteUser} = require('../controllers/admin.controller');

router.get('/users', requireAuth, requireAdmin, getAllUsers);
router.delete('/users/:id', requireAuth, requireAdmin, deleteUser);

module.exports = router;