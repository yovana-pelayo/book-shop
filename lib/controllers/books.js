const { Router } = require('express');
const { Book } = require('../models/Books');

module.exports = Router().post('/', async (req, res) => {
  const book = await Book.insert(req.body);
  res.json(book);
});
