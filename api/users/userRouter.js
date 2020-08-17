const express = require('express')

const router = express.Router();

//==== /users ======

router.get('/', (req, res) => {
  res.status(200).json({message: 'users'})
})


module.exports = router