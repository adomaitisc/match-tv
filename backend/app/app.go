package app

import (
	"adomaitisc.com/main/app/database"
	"github.com/gorilla/mux"
)

type App struct {
	Router 		*mux.Router
	DB 			database.PlanetDB

} // end App struct

func New() *App {
	a := &App {
		Router: mux.NewRouter(),
	}

	a.initRoutes()
	return a
} // end New func

func (a *App) initRoutes() {
	a.Router.HandleFunc("/", a.IndexHandler()).Methods("GET")
	a.Router.HandleFunc("/api/movies", a.CreateMovieHandler()).Methods("POST")
	a.Router.HandleFunc("/api/movies", a.GetMoviesHandler()).Methods("GET")
	a.Router.HandleFunc("/api/movies/{movie_id}", a.DeleteMovieHandler()).Methods("DELETE")
} // end initRoutes func
