const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../repositories/users.repository");

async function register({username, name, email, password, avatarUrl}) {
    if (!username || !name || !email || !password ) {
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
        name,
        email,
        user_role: 'user',
        password_hash: hash,
        salt,
        user_image_url: avatarUrl,
    });



    const token = jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role },
        config.jwtSecret,
        { expiresIn: "24h" }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            user_image_url: user.user_image_url
        }
    };

}

async function login({username, password}) {
    const user = await usersService.findByUsername(username);

    if(!user) {
        throw { status: 401, message: "Invalid credentials!" };
    }

    const hash = crypto
        .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
        .toString("hex");

    if (hash !== user.password_hash) {
        throw { status: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role  },
        config.jwtSecret,
        { expiresIn: "24h" }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            user_image_url: user.user_image_url
        }
    };
}

module.exports = {register, login};