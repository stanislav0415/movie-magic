import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import { Types } from 'mongoose';
import { getCategoryOptionsViewData } from '../utils/movieUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const movieController = express.Router();

movieController.get('/create', isAuth,(req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {


    const userId = req.user.id;

    const newMovie = req.body;

   
    await movieService.create(newMovie);

  
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
   
    const movieId = req.params.movieId;

    const userId = req.user?.id;

   
    const movie = await movieService.getOne(movieId);

    const isOwner = movie.owner?.equals(userId);


    res.render('movie/details', { movie });
});

movieController.get('/search', async (req, res) => {

    const filter = req.query;

 
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});




movieController.get('/:movieId/attach',isAuth, async (req, res) => {
    const movieId = req.params.movieId;

 
    const movie = await movieService.getOne(movieId);


    const casts = await castService.getAll({ exclude: movie.casts });

  
    res.render('movie/attach',isAuth, { movie, casts });
});

movieController.post('/:movieId/attach', async (req, res) => {

    const movieId = req.params.movieId;

  
    const castId = req.body.cast;

    
    await movieService.attach(movieId, castId);

    
    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete',isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.delete(movieId)

    res.redirect('/')
});

movieController.get('/:movieId/edit',isAuth, async (req, res) => {

    const movieId = req.params.movieId;


    const movie = await movieService.getOne(movieId);
       //TODO: CHECK IF OWNER

    const userId = req.userId?.id;

    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        //TODO: ADD ERROR HANDLING
       return res.status(403).end()
    }


    const getCategoryOptionsViewData = getCategoryOptionsViewData(movie.category)

    res.render('movie/edit', { 
        movie, 
        categoryOptions: getCategoryOptionsViewData,
        pageTitle: 'Edit'
    });
})

movieController.post('/:movieId/edit',isAuth, async (req, res) => {
   const movieId = req.params.movieId;

   const movieData = req.body;
   //TODO: CHECK IF OWNER
    //get userid
   //const userId = req.user?.Id;

   

   await movieService.update(movieId, movieData);





   
   res.redirect(`/movies/${movieId}/details`);
});


export default movieController;
