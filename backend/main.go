package main

import (
	"log"
	"net/http"
	"os"

	"adomaitisc.com/main/app"
	"adomaitisc.com/main/app/database"
)

func main() {
	app := app.New()
	app.DB = &database.DB{}
	err := app.DB.Open()
	check(err)

	defer app.DB.Close()

	http.HandleFunc("/", app.Router.ServeHTTP)

	log.Println("Server Running on Port 8080!")
	err = http.ListenAndServe(":8080", nil)
	check(err)
} // end main func

func check(e error) {
	if e != nil {
		log.Fatal(e)
		os.Exit(1)
	} // end if
} // end check func