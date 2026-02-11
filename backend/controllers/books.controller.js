const booksService = require('../services/books.service');

async function getAllBooks(req, res) {
    try{
        const books = await booksService.findAll();
        res.status(200).json(books);

    } catch (err){
        res.status(500).json({ message: 'Failed to fetch books' });
    }
}

async function getBookById(req, res) {
    try{
        const book = await booksService.findById(req.params.id);

        if(!book){
            res.status(404).json({message: 'Book not found'});
        }

        res.status(200).json(book);
    } catch(err){
        res.status(500).json({ message: 'Failed to fetch book id' });
    }
}

async function createBook(req, res) {
    try{
        const book = await booksService.createBook(req.body);
        res.status(200).json(book);

    } catch (err){
        res.status(500).json({ message: 'Failed to create book' });
    }
}

async function updateBook(req, res) {
    try{
        const book = await booksService.updateBook(req.params.id, req.body);

        const existingBook = await booksService.findById(req.params.id);
        if(!existingBook){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).json(book);

    } catch (err){
        res.status(500).json({ message: 'Failed to update book' });
    }

}

async function deleteBook(req, res) {
    try{
        const existingBook = await booksService.deleteBook(req.params.id);

        if(!existingBook){
            return res.status(404).json({message: 'Book not found'});
        }

        await booksService.deleteBook(req.params.id);
        res.json({ success: true });
    } catch (err){
        res.status(500).json({ message: 'Failed to delete book' });
    }

}

module.exports = {getAllBooks, getBookById, createBook, updateBook, deleteBook};