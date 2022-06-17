const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  author;
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.author = row.author;
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

  //   static async getById(id) {
  //     const {rows} = await pool.query(
  //       'SELECT books.*, COALESCE(json_agg(to_jsonb(authors)) FILTER (WHERE authors.id IS NOT NULL), '[]' ) as authors from books
  //       LEFT JOIN '
  //     )
  //   }
}

module.exports = { Book };

// this is what we want our data to look like what we can the call to contain
