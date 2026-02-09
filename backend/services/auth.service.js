const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("./users.service");

async function register({username, email, password}) {
    if (!username || !email || !password) {
        throw { status: 400, message: "Missing fields" };
    }

    const existing = await usersService.findByUsername(username);
    if (existing) {
        throw { status: 400, message: "User already exists" };
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");

    const user = await usersService.createUser({
        username,
        email,
        password: hash,
        salt,
    });



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

    const hash = crypto
        .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
        .toString("hex");

    if (hash !== user.password) {
        throw { status: 401, message: "Invalid credentials" };
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