const booksService = require('../services/books.service');

async function getAllBooks(req, res) {
    try {
        const { genre } = req.query;
        const books = await booksService.findAll(genre);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch books' });
    }
}


async function getBookById(req, res) {
    try{
        const book = await booksService.findById(req.params.id);

        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }

        res.status(200).json(book);
    } catch(err){
        res.status(500).json({ message: 'Failed to fetch book id' });
    }
}

async function createBook(req, res) {
    try{
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const image_url = req.file ? `/uploads/books/${req.file.filename}` : null;

        const book = await booksService.createBook({
            ...req.body,
            image_url
        });
        res.status(200).json(book);

    } catch (err){
        res.status(500).json({ message: 'Failed to create book' });
    }
}

async function updateBook(req, res) {
    try {

        const existingBook = await booksService.findById(req.params.id);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const book = await booksService.updateBook(req.params.id, req.body);

        res.status(200).json(book);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update book' });
    }
}


async function deleteBook(req, res) {
    try {
        const existingBook = await booksService.deleteBook(req.params.id);

        if (existingBook.rowCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete book" });
    }
}


module.exports = {getAllBooks, getBookById, createBook, updateBook, deleteBook};