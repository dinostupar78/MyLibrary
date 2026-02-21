require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const config = require("./config");
const db = require('./library');
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
        app.use("/api/genres", genreRoutes);

        const booksRoutes = require('./routes/books.routes');
        app.use("/api/books", booksRoutes);

        const statsRoutes = require('./routes/stats.routes');
        app.use("/api/stats", statsRoutes);

        const loansRoutes = require('./routes/loans.routes');
        app.use("/api/loans", loansRoutes);

        const googleRoutes = require('./routes/google.routes');
        app.use("/api/google", googleRoutes);

        app.use("/uploads", express.static("uploads"));

        app.use(express.static(
            path.join(__dirname, 'public', 'frontend', 'browser')
        ));

        app.get(/.*/, (req, res) => {
            res.sendFile(
                path.join(__dirname, 'public', 'frontend', 'browser', 'index.html')
            );
        });

        try {
            const result = await db.one('SELECT NOW()');
            console.log('PostgreSQL connected at:', result.now);
        } catch (dbErr) {
            console.error('PostgreSQL connection failed:', dbErr.message);
            process.exit(1);
        }

        app.listen(config.port, () => {
            console.log(`Running on port ${config.port}`);
        });

    }catch(err){
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();