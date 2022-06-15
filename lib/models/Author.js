const pool = require('../utils/pool');

class Author {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }
  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name) VALUES ($1) RETURNING*',
      [name]
    );
    return new Author(rows[0]);
  }

  //   static async getAuthId(id) {
  //     const { rows } = await pool.query('SELECT * FROM authors');
}

module.exports = { Author };
