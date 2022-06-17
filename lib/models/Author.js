const pool = require('../utils/pool');

class Author {
  author_id;
  author;
  dob;
  book;

  constructor(row) {
    this.author_id = row.author_id;
    this.author = row.author;
    this.dob = row.dob;
    this.book = row.book && row.book;
  }

  static async insert({ author, dob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (author, dob) VALUES ($1, $2) RETURNING*',
      [author, dob]
    );
    return new Author(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors;');
    return rows.map((row) => new Author(row));
  }

  static async getAuthId(id) {
    const { rows } = await pool.query(
      `SELECT authors.*, COALESCE(
        json_agg(to_jsonb(books)) FILTER (WHERE books.book_id IS NOT
          NULL), '[]') as book from authors Left JOIN books_authors on 
          authors.author_id = books_authors.auth_id Left JOIN books on
          books_authors.bk_id = 
          books.book_id WHERE authors.author_id = $1
                  GROUP BY authors.author_id`,
      [id]
    );
    return new Author(rows[0]);
  }
}
// all books by authors
module.exports = { Author };
