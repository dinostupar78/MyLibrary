function requireAdmin(req, res, next) {
    console.log('REQ USER:', req.user);

    if(!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'AdminService access only' });
    }
    next();
}

module.exports = {requireAdmin};