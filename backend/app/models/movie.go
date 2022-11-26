package models

type Movie struct {
	MovieID       int     `json:"movie_id"`
	MovieTitle    string  `json:"movie_title"`
	MovieYear     int     `json:"movie_year"`
	MovieLink     string  `json:"movie_link"`
	MovieRating   float64 `json:"movie_rating"`
	MovieUserRate float64 `json:"movie_user_rating"`
	MovieWatched  bool    `json:"movie_watched"`
	MovieDirector string  `json:"movie_director"`
	MoviePoster   string  `json:"movie_poster"`
} // end Movie struct

type JsonMovie struct {
	MovieID       int     `json:"movie_id"`
	MovieTitle    string  `json:"movie_title"`
	MovieYear     int     `json:"movie_year"`
	MovieLink     string  `json:"movie_link"`
	MovieRating   float64 `json:"movie_rating"`
	MovieUserRate float64 `json:"movie_user_rating"`
	MovieWatched  bool    `json:"movie_watched"`
	MovieDirector string  `json:"movie_director"`
	MoviePoster   string  `json:"movie_poster"`
} // end JsonMovie struct