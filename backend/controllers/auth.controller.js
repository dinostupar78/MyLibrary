const authService = require("../services/auth.service");


async function register(req, res) {
    try{
        const result = await authService.register(req.body);
        res.status(201).json(result);
    }catch(err){
        res.status(err.status || 500).json({ message: err.message });
    }
}

async function login(req, res) {
    try{
        const result = await authService.login(req.body);
        res.status(201).json(result);
    }catch(err){
        res.status(err.status || 500).json({ message: err.message });
    }
}

function me(req, res) {
    res.json({
        user: {
            id: req.user.sub,
            email: req.user.email,
            role: req.user.role,
        }
    })
}

module.exports = {register, login, me};
