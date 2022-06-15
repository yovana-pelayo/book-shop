-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE books(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released VARCHAR
);

CREATE TABLE authors(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR
);

INSERT INTO books (
    title,
    released
)
VALUES 
('Water for Elephants', '2006'),
('Green Eggs and Ham', '1960');

INSERT INTO authors (
    name
)

VALUES ('Sara Gruen'),
('Dr.Suess')