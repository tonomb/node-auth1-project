const express = require('express')
const server = express()

const usersRouter = require('./users/userRouter')

server.use(express.json())

server.use('/users', usersRouter)

server.get('/', (req, res) => {
  res.status(200).json({api: 'running on port 5000'})
})


module.exports = server