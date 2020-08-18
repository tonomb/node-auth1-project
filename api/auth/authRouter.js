const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');


const Users = require('../users/userModel')

//==== /api ======

router.post('/register', (req, res) => {
  const {password, username} = req.body

  const hash = bcrypt.hashSync(password, 8);

  const newUser = {
    username,
    password: hash
  }

  Users.add(newUser)
    .then( user =>{
      res.status(201).json(user)
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json({message: 'something went wrong when saving the new user to the db'})
    })
})


router.post('/login', (req, res) => {
  const {password, username} = req.body

  Users.getByUsername(username)
    .then( user =>{
      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user // sets cookie when user loggs in
        res.status(200).json({message: 'welcome'})
      } else {
        res.status(401).json({error:'invalid credentials'})
      }
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json({error: err.message})
    })
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});


module.exports = router