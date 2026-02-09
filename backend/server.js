const express = require("express");
const app = express();
const config = require("./config");

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/auth", require("./routes/auth/auth.routes"));


app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`);
});
