const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const authorId = await Author.get;
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.json(author);
  });
