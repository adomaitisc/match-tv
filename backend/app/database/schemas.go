package database

const createSchema = `
CREATE TABLE IF NOT EXISTS movies (
	movie_id INT NOT NULL AUTO_INCREMENT,
	movie_title VARCHAR(255) NOT NULL,
	movie_year INT NOT NULL,
	movie_link VARCHAR(255) NOT NULL,
	movie_rating DECIMAL NOT NULL DEFAULT 0,
	movie_user_rating DECIMAL NOT NULL DEFAULT 0,
	movie_watched BOOLEAN NOT NULL DEFAULT FALSE,
	movie_director VARCHAR(255) NOT NULL,
	movie_poster VARCHAR(255) NOT NULL,
	PRIMARY KEY (movie_id)
	)`

const insertMovieSchema = `
INSERT INTO movies (movie_id, movie_title, movie_year, movie_link, movie_rating, movie_user_rating, movie_watched, movie_director, movie_poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`

const getMovieSchema = `
SELECT * FROM movies
`

const getMovieByTitleSchema = `
SELECT * FROM movies WHERE movie_title = ?
`

const deleteMovieSchema = `
DELETE FROM movies WHERE movie_id = ?
`