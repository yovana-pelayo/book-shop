const pool = require('../utils/pool');

class Author {
  id;
  author;
  book;

  constructor(row) {
    this.id = row.id;
    this.author = row.author;
    this.book = row.book;
  }
  static async insert({ author }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (author) VALUES ($1) RETURNING*',
      [author]
    );
    return new Author(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT id, author from authors');
    console.log('rows', rows);
    return rows.map((row) => new Author(row));
  }

  //   static async getAuthId(id) {
  //     const { rows } = await pool.query('SELECT * FROM authors');
}

module.exports = { Author };
