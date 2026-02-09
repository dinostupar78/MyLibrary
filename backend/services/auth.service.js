const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("./users.service");

async function register({email, password}) {
    if (!email || !password) {
        throw { status: 400, message: "Email and password required" };
    }

    const existing = await usersService.register(email, password);
    if (existing) {
        throw { status: 400, message: "User already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersService.createUser(email, passwordHash);

    const token = jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role },
        config.jwtSecret,
        { expiresIn: "24h" }
    );

    return { token, user };

}

async function login({email, password}) {
    const user = await usersService.login(email, password);
    if(!user) {
        throw { status: 401, message: "Invalid credentials!" };
    }

    const compare = await bcrypt.compare(password, user.passwordHash);
    if (!compare) {
        throw { status: 401, message: "Invalid credentials!" };
    }

    const token = jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role },
        config.jwtSecret,
        { expiresIn: "24h" }
    );

    return {token, user: {id: user.id, email: user.email, role: user.role }
    };
}

module.exports = {register, login};