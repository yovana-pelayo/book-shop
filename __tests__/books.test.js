const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Book } = require('../lib/models/Books');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new book', async () => {
    const book = new Book({
      title: 'Water for Elephants',
      released: '2006',
    });

    const res = await request(app).post('/books').send(book);
    expect(res.body.title).toEqual(book.title);
    expect(res.body.released).toEqual(book.released);
  });
  afterAll(() => {
    pool.end();
  });
});
