const genresService = require('../services/genres.service');

async function getAllGenres(req, res) {
    try{
        const genres = await genresService.findAll();
        res.json(genres);

    } catch(err){
        res.status(404).send("Failed to fetch genres");
    }
}

async function createGenre(req, res) {
    try{
        const { name } = req.body;

        if(!name){
            return res.status(400).json({message: 'Name is required'});
        }

        const existingGenre = await genresService.findByName(name);
        if(existingGenre){
            return res.status(401).json({message: 'Genre is already exist'});
        }

        const createNewGenre = await genresService.createGenre(name);

        res.status(201).json(createNewGenre);

    } catch(err){
        res.status(404).send("Failed to create genre");
    }
}

async function updateGenre(req, res) {
    try{
        const { id } = req.params;
        const { name } = req.body;

        if(!name){
            return res.status(400).json({message: 'Name is required'});
        }

        const currentGenre = await genresService.findById(id);
        if(!currentGenre){
            return res.status(401).json({message: 'Genre not found'});
        }

        const existingGenre = await genresService.findByName(name);
        if(existingGenre && existingGenre.id !== id){
            return res.status(401).json({message: 'Genre already exists'});
        }
        const updatedGenre = await genresService.updateGenre(id, name);
        res.status(201).json(updatedGenre);

    } catch(err){
        res.status(404).send("Failed to update genre");
    }
}

async function deleteGenre(req, res) {
    try{
        const { id } = req.params;

        const currentGenre = await genresService.findById(id);
        if(!currentGenre){
            return res.status(401).json({message: 'Genre not found'});
        }

        const deletedGenre = await genresService.deleteById(id);
        res.json({ success: true, deletedGenre });

    } catch(err){
        res.status(404).send("Failed to delete genre");
    }
}

module.exports = {getAllGenres, createGenre, updateGenre, deleteGenre};