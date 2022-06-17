const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.json(author);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getAuthId(req.params.id);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  // creates author entry in data table

  .get('/', async (req, res) => {
    const authors = await Author.getAll(req.body);
    res.json(authors);
  });
