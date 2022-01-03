const express = require('express');
const bodyParser = require('body-parser');
const { 
  getTalkers, 
  getTalkerById, 
  createTalker1, 
  createTalker2,
  includeTalker, 
  modifyTalker,
  deleteTalker,
  createTalker3,
  searchTalker,
} = require('./controllers/talkers');
const { login } = require('./middlewares/auth');
const tokenValidate = require('./middlewares/token');
const errorHandler = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getTalkers);
app.get('/talker/search', tokenValidate, searchTalker);
app.get('/talker/:id', getTalkerById);
app.post('/login', login);
app.post('/talker', tokenValidate, createTalker1, createTalker2, createTalker3, includeTalker);
app.put('/talker/:id', tokenValidate, createTalker1, createTalker2, createTalker3, modifyTalker);
app.delete('/talker/:id', tokenValidate, deleteTalker);

app.use(errorHandler);
