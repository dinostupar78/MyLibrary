const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/books");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, "book-" + Date.now() + ext);
    }
});

const uploadBook = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only images allowed"));
        }
        cb(null, true);
    }
});

const upload = multer({ storage });

module.exports = upload;
