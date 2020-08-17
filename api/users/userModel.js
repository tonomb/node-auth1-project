const db = require('../../data/dbConfig')

module.exports = {
  add,
  getUsers,
  getByUsername
}


function add(user){
  return db('users').insert(user)
    .then(ids => {
      return db('users').select('*').where({id: ids}).first()
    })
}

function getUsers(){
  return db('users').select('*')
}

function getByUsername(username){
  return db('users').select('*').where({username}).first()
}