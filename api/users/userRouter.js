const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');


const Users = require('./userModel')

//==== /users ======

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users =>{
      res.status(200).json({users})
    })
})

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

module.exports = router