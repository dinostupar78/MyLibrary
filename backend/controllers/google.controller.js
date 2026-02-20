const axios = require("axios");
const googleService = require('../services/google.service');


async function searchGoogleBooks(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Missing query" });
        }

        const response = await axios.get(
            "https://www.googleapis.com/books/v1/volumes",
            {
                params: {
                    q,
                    printType: "books",
                    maxResults: 20
                }
            }
        );

        const books = (response.data.items || []).map(item => {
            const info = item.volumeInfo;

            return {
                title: info.title,
                authors: info.authors || [],
                description: info.description,
                categories: info.categories || [],
                image_url: info.imageLinks?.thumbnail
            };
        });

        res.json(books);

    } catch (err) {
        console.error("GoogleService search error:", err.message);
        res.status(500).json({ message: "GoogleService API error" });
    }
}

async function importBookFromGoogle(req, res) {
    try {
        const { title, authors, description, categories, image_url } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Missing title" });
        }

        const genreName = categories?.[0] || "Other";

        let genre = await googleService.findGenreByName(genreName);

        if (!genre) {
            genre = await googleService.createGenre(genreName);
        }

        const book = await googleService.createBook({
            title,
            author: authors?.join(", ") || "Unknown",
            description,
            image_url,
            genreId: genre.id,
            total_copies: 1
        });

        res.status(201).json(book);

    } catch (err) {
        console.error("Import error:", err);
        res.status(500).json({ message: "Import failed" });
    }
}

module.exports = {searchGoogleBooks, importBookFromGoogle};