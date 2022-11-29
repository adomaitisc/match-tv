package database

import "adomaitisc.com/main/app/models"

func (d* DB) CreateMovie(m *models.Movie) error {
	res, err := d.db.Exec(insertMovieSchema, m.MovieID, m.MovieTitle, m.MovieYear, m.MovieLink, m.MovieRating, m.MovieUserRate, m.MovieWatched, m.MovieDirector, m.MoviePoster)
	if err != nil {
		return err
	} // end if

	res.LastInsertId()
	return err
} // end CreateMovie func

func (d* DB) GetMovie() ([]*models.Movie, error) {
	rows, err := d.db.Query(getMovieSchema)
	if err != nil {
		return nil, err
	} // end if

	defer rows.Close()

	var movies []*models.Movie

	for rows.Next() {
		movie := &models.Movie{}

		err = rows.Scan(&movie.MovieID, &movie.MovieTitle, &movie.MovieYear, &movie.MovieLink, &movie.MovieRating, &movie.MovieUserRate, &movie.MovieWatched, &movie.MovieDirector, &movie.MoviePoster)
		if err != nil {
			return nil, err
		} // end if

		movies = append(movies, movie)
	} // end for

	return movies, err
} // end GetMovie func

func (d* DB) GetMovieByTitle(MovieTitle string) (*models.Movie, error) {
	movie := &models.Movie{}

	row := d.db.QueryRow(getMovieByTitleSchema, MovieTitle)
	err := row.Scan(&movie.MovieID, &movie.MovieTitle, &movie.MovieYear, &movie.MovieLink, &movie.MovieRating, &movie.MovieUserRate, &movie.MovieWatched, &movie.MovieDirector, &movie.MoviePoster)
	return movie, err
} // end GetSingleMovie func

func (d* DB) DeleteMovie(MovieID int) error {
	// check if there is a movie with that id
	_, err := d.db.Exec(deleteMovieSchema, MovieID)
	if err != nil {
		return err
	} // end if

	return err
}