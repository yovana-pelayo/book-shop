-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books_authors CASCADE;


CREATE TABLE books(
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released VARCHAR
);

CREATE TABLE authors(
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   author VARCHAR,
   dob Varchar
);

CREATE TABLE books_authors (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
bk_id BIGINT,
auth_id BIGINT,
FOREIGN KEY (bk_id) REFERENCES books(book_id),
FOREIGN KEY (auth_id) REFERENCES authors(author_id)
);

INSERT INTO books (
    title,
    released
)
VALUES 
('Water for Elephants', '2006'),
('Green Eggs and Ham', '1960');

INSERT INTO authors (
author, dob
)
VALUES ('Sara Gruen', '1969'),
('Dr.Suess', 'March 2, 1904'); 

INSERT INTO books_authors(
    bk_id, auth_id

)
VALUES (1,1
),(2,1), (2,2);
