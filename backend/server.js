const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const config = require("./config");
const path = require("path");

async function startServer(){
    try{
        app.use(helmet({contentSecurityPolicy: false}));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            next();
        });

        app.use("/api/auth", require("./routes/auth.routes"));

        app.use(express.static(
            path.join(__dirname, 'public', 'frontend', 'browser')
        ));

        app.get(/.*/, (req, res) => {
            res.sendFile(
                path.join(__dirname, 'public', 'frontend', 'browser', 'index.html')
            );
        });

        app.listen(config.port, () => {
            console.log(`Running on port ${config.port}`);
        });

    }catch(err){
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();