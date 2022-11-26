package app

import (
	"encoding/json"
	"log"
	"net/http"

	"adomaitisc.com/main/app/models"
)

func parse (w http.ResponseWriter, r *http.Request, data interface{}) error {
	return json.NewDecoder(r.Body).Decode(data)
} // end parse func

func sendResponse(w http.ResponseWriter, _ *http.Request, data interface{}, status int) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)

	if data == nil {
		return
	} // end if

	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		log.Fatal("Error encoding response: ", err)
	} // end if
} // end sendResponse func

func mapMovieToJSON(m *models.Movie) models.JsonMovie {
	return models.JsonMovie{
		MovieID:          m.MovieID,
		MovieTitle:       m.MovieTitle,
		MovieYear:        m.MovieYear,
		MovieLink:        m.MovieLink,
		MovieRating:      m.MovieRating,
		MovieUserRate:    m.MovieUserRate,
		MovieWatched:     m.MovieWatched,
		MovieDirector:    m.MovieDirector,
		MoviePoster:      m.MoviePoster,
	} // end return
} // end mapMovieToJSON func