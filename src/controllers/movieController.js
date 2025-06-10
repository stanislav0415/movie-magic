import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import { getCategoryOptionsViewData } from '../utils/movieUtils.js';
import { auth } from '../middleware/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const movieController = express.Router();

movieController.get('/create', auth,(req, res) => {
    res.render('movie/create');
});

movieController.post('/create', async (req, res) => {


    const userId = req.user.id;

    const newMovie = req.body;

   
   try {
    await movieService.create(newMovie,userId);

    

       res.redirect('/');
   } catch (err) {

    const categoryOptionsViewData = getCategoryOptionsViewData(newMovie.category)

    res.render('movie/create', {
        error: getErrorMessage(err),
        movie: newMovie, 
        categoryOptions})
   }
});

movieController.get('/:movieId/details', async (req, res) => {
   
    const movieId = req.params.movieId;

    const userId = req.user?.id;

   
    const movie = await movieService.getOne(movieId);


    const isOwner = movie.owner?.equals(userId);

    res.render('movie/details', { movie, isOwner, pageTitle: 'Details' });
});

movieController.get('/search', async (req, res) => {

    const filter = req.query;

 
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});




movieController.get('/:movieId/attach',auth, async (req, res) => {
    const movieId = req.params.movieId;

 
    const movie = await movieService.getOne(movieId);


    const casts = await castService.getAll({ exclude: movie.casts });

  
     res.render('movie/attach', { movie, casts, pageTitle: 'Attach' });
});

movieController.post('/:movieId/attach', async (req, res) => {

    const movieId = req.params.movieId;

  
    const castId = req.body.cast;

    
    await movieService.attach(movieId, castId);

    
    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete',auth, async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.delete(movieId)

    res.redirect('/')
});

movieController.get('/:movieId/edit',auth, async (req, res) => {

    const movieId = req.params.movieId;


    const movie = await movieService.getOne(movieId);
       //TODO: CHECK IF OWNER

    const userId = req.user?.id;

    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        
       return res.dataRedirect('/404', {error: 'You do not have access edit this movie'})
    }


    const categoryOptionsViewData = getCategoryOptionsViewData(movie.category);

    res.render('movie/edit', { 
        movie, 
        categoryOptions: categoryOptionsViewData,
        pageTitle: 'Edit'
    });
})

movieController.post('/:movieId/edit',auth, async (req, res) => {
   const movieId = req.params.movieId;

   const movieData = req.body;
   //TODO: CHECK IF OWNER
    //get userid
   //const userId = req.user?.Id;

   

   await movieService.update(movieId, movieData);





   
   res.redirect(`/movies/${movieId}/details`);
});


export default movieController;
