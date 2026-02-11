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

        const authRoutes = require('./routes/auth.routes');
        app.use("/api/auth", authRoutes);

        const usersRoutes = require('./routes/users.routes');
        app.use("/api/users", usersRoutes);

        const adminRoutes = require('./routes/admin.routes');
        app.use("/api/admin", adminRoutes);

        const genreRoutes = require('./routes/genres.routes');
        app.use("/api/genres", genreRoutes)

        const booksRoutes = require('./routes/books.routes');
        app.use("/api/books", booksRoutes)

        app.use("/uploads", express.static("uploads"));

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