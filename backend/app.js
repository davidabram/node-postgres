const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: '🎅 🎅 🎅 🎅 🎅',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
