const pool = require('../utils/pool');

class Author {
  id;
  author;

  constructor(row) {
    this.id = row.id;
    this.author = row.author;
  }
  static async insert({ author }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (author) VALUES ($1) RETURNING*',
      [author]
    );
    return new Author(rows[0]);
  }

  //   static async getAuthId(id) {
  //     const { rows } = await pool.query('SELECT * FROM authors');
}

module.exports = { Author };
