import express from 'express';
import movieService from '../services/movieService';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
})

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    movieService.create(newMovie);

    res.redirect('/');
})

export default movieController;