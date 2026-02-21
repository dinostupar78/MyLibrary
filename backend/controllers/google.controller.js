const axios = require("axios");
const googleService = require('../services/google.service');
const config = require("../config");

async function searchGoogleBooks(req, res) {
    try {
        console.log("GOOGLE KEY:", config.googleApiKey);

        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Missing query" });

        if (!config.googleApiKey) {
            return res.status(500).json({ message: "GOOGLE_API_KEY is missing on server" });
        }

        const response = await axios.get(
            "https://www.googleapis.com/books/v1/volumes",
            {
                params: {
                    q,
                    printType: "books",
                    maxResults: 20,
                    key: config.googleApiKey,
                },
            }
        );

        const books = (response.data.items || []).map((item) => {
            const info = item.volumeInfo || {};
            return {
                title: info.title,
                authors: info.authors || [],
                description: info.description || "",
                categories: info.categories || [],
                image_url: info.imageLinks?.thumbnail || null,
            };
        });

        return res.json(books);
    } catch (err) {
        console.error("Google search error:", err);
        return res.status(500).json({ message: "GoogleService API error" });
    }
}

async function importBookFromGoogle(req, res) {
    try {
        const { title, authors, description, categories, image_url } = req.body;
        if (!title) return res.status(400).json({ message: "Missing title" });

        const genreName = (categories?.[0] || "Other").trim();

        let genre = await googleService.findGenreByName(genreName);
        if (!genre) genre = await googleService.createGenre(genreName);

        const book = await googleService.createBook({
            title,
            author: authors?.join(", ") || "Unknown",
            description: description || "",
            image_url,
            genreId: genre.id,
            total_copies: 1,
        });

        return res.status(201).json(book);
    } catch (err) {
        console.error("Import error:", err);
        return res.status(500).json({ message: "Import failed" });
    }
}

module.exports = {searchGoogleBooks, importBookFromGoogle};