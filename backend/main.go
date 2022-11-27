package main

import (
	"log"
	"net/http"
	"os"

	"adomaitisc.com/main/app"
	"adomaitisc.com/main/app/database"
	"github.com/gorilla/handlers"
)

func main() {
	app := app.New()
	app.DB = &database.DB{}
	err := app.DB.Open()
	check(err)

	defer app.DB.Close()

	http.HandleFunc("/", app.Router.ServeHTTP)

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	log.Println("Server Running on Port 8080!")
	// add cors handler here
	err = http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(app.Router))
	check(err)
} // end main func

func check(e error) {
	if e != nil {
		log.Fatal(e)
		os.Exit(1)
	} // end if
} // end check func