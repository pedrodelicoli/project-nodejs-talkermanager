const crypto = require('crypto');

const login = async (req, res, _next) => {
  const key = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (re.test(email) === false) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }   
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).send({ token: key });       
};
    
module.exports = { login };