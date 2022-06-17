const pool = require('../utils/pool');

class Book {
  book_id;
  title;
  released;
  author;

  constructor(row) {
    this.book_id = row.book_id;
    this.title = row.title;
    this.released = row.released;
    this.author = row.author && row.author;
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING*',
      [title, released]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books;');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*, COALESCE(
        json_agg(to_jsonb(authors)) FILTER (WHERE authors.author_id IS NOT NULL), '[]') as author from books LEFT JOIN books_authors on books.book_id = books_authors.bk_id LEFT JOIN authors on books_authors.auth_id = authors.author_id WHERE books.book_id = $1 GROUP BY books.book_id`,
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };

// this is what we want our data to look like what we can the call to contain
