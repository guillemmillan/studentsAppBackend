 
const express    = require('express');
const authRoutes = express.Router();
 
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
 
// require the user model !!!!
const User       = require('../models/user');
 
 
authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
 
    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {
 
        if(err){
            console.log("error 500", err)
            res.status(500).json({message: "Username check went bad."});
            return;
        }
 
        if (foundUser) {
            console.log("funciona")
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username:username,
            password: hashPass,
        });
  
        aNewUser.save(err => {
            if (err) {
                console.log("comprobar error signup", err)
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
           req.session.currentUser = aNewUser
           res.status(200).json({aNewUser})    
           res.redirect('/login');

        });
    });
});

authRoutes.post('/login', async (req, res, next) => {
    const {
      username,
      password,
      imageUrl
    } = req.body
    if (!username || !password) {
      res.status(400).json({message: "Please provide an email and password"})
      return;
    }
    try {
      user = await User.findOne({username})
      if(!user){
        res.status(401).json({message: "This user does not exists"})
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        console.log("Usuario guardado en sesion", req.session.currentUser)
        res.status(200).json(req.session.currentUser)
      } else {
        res.status(400).json({message: "Incorrect password"})
        console.log("password erroneo")
      }
    } catch (error) {
        console.log("error login", error)
      next(error)
    }
    res.redirect('/profile');

  });

  authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' })
    res.redirect('/');
});
 
module.exports = authRoutes;