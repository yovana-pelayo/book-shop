const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Book } = require('../lib/models/Book');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books should return list of books', async () => {
    const resp = await request(app).get('/books');
    console.log('resp', resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        book_id: '1',
        title: 'Water for Elephants',
        released: '2006',
      },
      { book_id: '2', title: 'Green Eggs and Ham', released: '1960' },
    ]);
  });
  it('/books/:id should return book detail', async () => {
    const resp = await request(app).get('/books/1');

    expect(resp.status).toBe(200);
    expect(resp.body.book_id).toEqual('1');
    expect(resp.body.title).toEqual('Water for Elephants');
    expect(resp.body).toHaveProperty('author');
  });
  it('should add a new book', async () => {
    const book = new Book({
      title: 'Water for Elephants',
      released: '2006',
    });

    const resp = await request(app).post('/books').send(book);
    expect(resp.body.title).toEqual(book.title);
    expect(resp.body.released).toEqual(book.released);
  });

  afterAll(() => {
    pool.end();
  });
});
//41 is where we test for the author or nested object
