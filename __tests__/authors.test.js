const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Author } = require('../lib/models/Author');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors should RETURN a list of authors', async () => {
    const resp = await request(app).get('/authors');

    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { author_id: '1', author: 'Sara Gruen', dob: '1969' },
      { author_id: '2', author: 'Dr.Suess', dob: 'March 2, 1904' },
    ]);
  });

  it('/authors/:id should return book detail', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.status).toBe(200);
    expect(resp.body.author).toEqual('Sara Gruen');
    expect(resp.body.dob).toEqual('1969');
    expect(resp.body).toHaveProperty('book');
  });

  it('should add a new author', async () => {
    const author = new Author({
      author: 'Yovana Pelayo',
      dob: '1996',
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.body.author).toEqual(author.author);
    expect(res.body.dob).toEqual(author.dob);
  });
  afterAll(() => {
    pool.end();
  });
});
