const { Router } = require('express');
const Book = require('../models/Books');

module.exports = Router().get('/', async (req, res) => {
  const book = await Book.getAll();
  res.json(book);
});
