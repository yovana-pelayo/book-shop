const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    console.log('rowa', rows);
    return rows.map((row) => new Book(row));
  }
  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING*',
      [title, released]
    );
    return new Book(rows[0]);
  }
}
module.exports = { Book };

//password for beekeeper
