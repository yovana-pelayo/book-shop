const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.json(book);
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll(req.body);
    res.json(books);
  });

// we are calling the model methods or calling the methods to take action and manipulate our data
// .get('/:id', async (req, res, next) => {
//   try {
//     const pet = awaitBook.getById(req.params.id);
//     res.json(pet);
//   } catch (e) {
//     next(e);
//   }
// });
