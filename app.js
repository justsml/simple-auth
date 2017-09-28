const http        = require('http');
const express     = require('express');
const app         = module.exports = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan')
const port        = parseInt(process.env.PORT || '3000');
const server      = http.createServer(app);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/login', (req, res, next) => {
  const {email, password} = req.query;
  res.status(403).send('not authorized!');
})

app.all('/user', (req, res, next) => {
  res.send('not implemented!');
})

server.listen(port);
server.on('error', console.error.bind(console));
server.on('listening', console.log.bind(console, 'Listening on ' + port));
