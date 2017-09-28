const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan')
const knex        = require('./knexfile')
const hash        = require('./hash')
const app         = module.exports = express()
const port        = parseInt(process.env.PORT || '3000')
const server      = http.createServer(app)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/login', login)
app.get('/signup', signup)
app.all('/', (req, res) => {
  res.send('Try following routes: <br />\nGET:/login?email=[string]&password=[string]<br />\nGET:/signup?email=[string]&password=[string]' )
})

function login(req, res, next) {
  let {email, password} = req.query
  hash(password).then(hashedPassword => {
    return knex('users').select('*').where({email, password: hashedPassword})
  })
  .then(user => res.send({user}))
  .catch(err => res.status(500).send({error: err.message, stack: err.stack}))
}

function signup(req, res, next) {
  const {email, password} = req.query
  hash(password).then(hashedPassword => {
    return knex('users').insert({email, password: hashedPassword})
  })
  .then(user => res.send({message: `${email} signup successful`}))
  .catch(err => {
    if (/UNIQUE/.test(err.message)) return res.status(500).send({message: 'Email/user already exists.'})
    res.status(500).send({error: err.message, stack: err.stack})
  })
}

server.listen(port);
server.on('error', console.error.bind(console));
server.on('listening', console.log.bind(console, 'Listening on ' + port));
