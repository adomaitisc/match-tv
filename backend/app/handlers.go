package app

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"adomaitisc.com/main/app/models"
	"github.com/gorilla/mux"
)

func (a *App) IndexHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to '/' route")
	}
} // end IndexHandler func

func (a *App) CreateMovieHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		req := models.Movie{}
		err := parse(w, r, &req)
		if err != nil {
			log.Fatal("Error parsing request body: ", err)
			sendResponse(w, r, nil, http.StatusBadRequest)
			return
		} // end if

		m := &models.Movie{
			MovieID:          req.MovieID,
			MovieTitle:       req.MovieTitle,
			MovieYear:        req.MovieYear,
			MovieRating:      req.MovieRating,
			MovieDirector:    req.MovieDirector,
			MovieLink:        req.MovieLink,
			MoviePoster:      req.MoviePoster,
			MovieUserRate:    req.MovieUserRate,
			MovieWatched:     req.MovieWatched,
		}

		err = a.DB.CreateMovie(m)
		if err != nil {
			log.Fatal("Error creating movie: ", err)
			sendResponse(w, r, nil, http.StatusInternalServerError)
			return
		} // end if

		resp := mapMovieToJSON(m)
		sendResponse(w, r, resp, http.StatusCreated)
	} // end func
} // end CreateMovieHandler func

func (a *App) GetMoviesHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		movies, err := a.DB.GetMovie()
		if err != nil {
			log.Fatal("Error getting movies: ", err)
			sendResponse(w, r, nil, http.StatusInternalServerError)
			return
		} // end if

		var resp = make([]models.JsonMovie, len(movies))
		for idx, movie := range movies {
			resp[idx] = mapMovieToJSON(movie)
		} // end for

		sendResponse(w, r, resp, http.StatusOK)
	} // end func
} // end GetMoviesHandler func

func (a *App) DeleteMovieHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		movie_id, err := strconv.Atoi(vars["movie_id"])
		if err != nil {
			log.Fatal("Error converting movie_id to int: ", err)
			sendResponse(w, r, nil, http.StatusBadRequest)
			return
		} // end if

		err = a.DB.DeleteMovie(movie_id)

		sendResponse(w, r, err, http.StatusOK)
	} // end func
}