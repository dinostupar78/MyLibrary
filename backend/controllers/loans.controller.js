const loansService = require("../services/loans.service");
const booksService = require("../services/books.service");

async function getAllLoans(req, res) {
    try {
        const loans = await loansService.findAll();
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch loans" });
    }
}

async function getLoansByUser(req, res) {
    try {
        const { id } = req.params;
        const loans = await loansService.findByUser(id);
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user loans" });
    }
}

async function borrowBook(req, res) {
    try {
        const user_id = req.user.sub; // iz JWT-a
        const { book_id, return_date } = req.body;

        if (!book_id || !return_date) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const book = await booksService.findById(book_id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.available_copies <= 0) {
            return res.status(400).json({ message: "No available copies" });
        }

        const existingLoan = await loansService.findActiveLoan(user_id, book_id);
        if (existingLoan) {
            return res.status(400).json({ message: "Book already borrowed" });
        }

        await loansService.createLoan(user_id, book_id, return_date);

        await booksService.decreaseAvailableCopies(book_id);

        res.status(201).json({ message: "Book borrowed successfully" });

    } catch (err) {
        console.error("BORROW ERROR:", err);
        res.status(500).json({ message: "Failed to borrow book" });
    }
}


async function returnBook(req, res) {
    try {
        const { id } = req.params;

        const loan = await loansService.findById(id);

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        if (loan.status === "returned") {
            return res.status(400).json({ message: "Already returned" });
        }

        await loansService.markAsReturned(id);
        await booksService.increaseAvailableCopies(loan.book_id);

        res.json({ message: "Book returned successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to return book" });
    }
}


module.exports = {
    getAllLoans,
    getLoansByUser,
    borrowBook,
    returnBook
};