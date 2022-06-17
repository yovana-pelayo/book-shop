const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Author } = require('../lib/models/Author');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should add a new author', async () => {
    const author = new Author({
      author: 'Yovana Pelayo',
    });

    const res = await request(app).post('/authors').send(author);
    expect(res.body.author).toEqual(author.author);
  });

  it('/authors should RETURN a list of authors', async () => {
    const resp = await request(app).get('/authors');

    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', author: 'Sara Gruen' },
      { id: '2', author: 'Dr.Suess' },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
