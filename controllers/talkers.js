const fs = require('fs');

const FILENAME = 'talker.json';

const getTalkers = async (_req, res, _next) => {
    const get = fs.readFileSync(FILENAME, 'utf-8');
    const jsonTalkers = JSON.parse(get); 
    if (jsonTalkers.lenght === 0) {
      const array = [];
      res.status(200).json(array);
    }   
    res.status(200).json(jsonTalkers);
};

const getTalkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const get = fs.readFileSync('talker.json', 'utf-8');
    const jsonTalkers = JSON.parse(get); 
    const talker = jsonTalkers.find((talk) => talk.id === parseInt(id, 10));
    if (!talker) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).send(talker);
  } catch (err) {
    next(err);
  }
};

const createTalker1 = async (req, res, next) => {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const createTalker2 = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).send({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  } 
  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }     
  next();   
}; 

const createTalker3 = async (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk; 
  const date = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (date.test(watchedAt) === false) {
      return res.status(400).send({
         message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate > 5 || rate < 1) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  if (!rate) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }    
  next();   
}; 

const includeTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const get = fs.readFileSync(FILENAME, 'utf-8');
  const jsonTalkers = JSON.parse(get); 
  const id = jsonTalkers.reduce((acc) => acc + 1, 1);
  const talker = { id, name, age, talk };
  jsonTalkers.push(talker);
  fs.writeFileSync(FILENAME, JSON.stringify(jsonTalkers));
  res.status(201).send({ ...talker });   
}; 

const modifyTalker = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const get = fs.readFileSync(FILENAME, 'utf-8');
  const jsonTalkers = JSON.parse(get); 
  const talkerFilter = jsonTalkers.filter((filter) => filter.id !== parseInt(id, 10));
  const talker = { id: Number(id), name, age, talk };
  talkerFilter.push(talker);
  fs.writeFileSync(FILENAME, JSON.stringify(talkerFilter));
  res.status(200).send({ ...talker });   
}; 

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;
  const get = fs.readFileSync(FILENAME, 'utf-8');
  const jsonTalkers = JSON.parse(get); 
  const filter = jsonTalkers.filter((talke) => talke.id !== parseInt(id, 10));
  fs.writeFileSync(FILENAME, JSON.stringify(filter));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });   
}; 

const searchTalker = async (req, res, _next) => {
  const { q } = req.query;
  const get = fs.readFileSync(FILENAME, 'utf-8');
  const jsonTalkers = JSON.parse(get); 
  const filter = jsonTalkers.filter((talke) => talke.name.includes(q));
  if (q) {
    res.status(200).send(filter);    
  } 
  if (!q || q === '') {
    res.status(200).send(jsonTalkers);
  }
  
  if (!filter) {
    res.status(200).send([]);
  }    
}; 

module.exports = { 
  getTalkers, 
  getTalkerById, 
  createTalker1, 
  createTalker2, 
  includeTalker, 
  modifyTalker,
  deleteTalker,
  createTalker3,
  searchTalker,
};