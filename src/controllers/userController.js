import { Router } from 'express'
import userService from '../services/userService.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
  
    const { email, password, rePassword } = req.body;

   
    try {
        const token = await userService.register({ email, password, rePassword })

         res.cookie('auth', token);

 
          res.redirect('/');
    } catch (err) {
        res.render('user/register', {error: err.message, email})
    }

   
   
});

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
 
    const { email, password } = req.body;

  
    const token = await userService.login(email, password);

   
    res.cookie('auth', token);

    
    res.redirect('/');
});

userController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    // TODO: Invalidate token

    res.redirect('/');
});

export default userController;