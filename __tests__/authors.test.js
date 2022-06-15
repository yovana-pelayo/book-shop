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
      name: 'Sara Gruen',
    });

    const res = await request(app).post('/authors').send(author);
    expect(res.body.name).toEqual(author.name);
  });
  afterAll(() => {
    pool.end();
  });
});
