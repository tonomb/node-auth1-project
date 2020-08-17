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


module.exports = router