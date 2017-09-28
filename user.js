const knex = require('./knexfile');

function find({email}) {
  return knex('user').where('email', email)
}

function create({email, password}) {
  return knex('user').insert({email, password})
}

function
  return knex('user')
  .where('email', user.email)
  .update(user)
      //if user already exist
      // .then(
      //   window.location.href('https://kojomon-ae289.firebaseapp.com/home.html?id=5')
      // )
  })
}
