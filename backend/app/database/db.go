package database

import (
	"database/sql"
	"log"
	"os"

	"adomaitisc.com/main/app/models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)


type PlanetDB interface {
	Open() error
	Close() error
	CreateMovie(m *models.Movie) error
	GetMovie() ([]*models.Movie, error)
} // end PostDB interface

type DB struct {
	db *sql.DB
} // end DB struct

func (d *DB) Open() error {
	db, err := sql.Open("mysql", dbEnv())
	if err != nil {
		return err
	} // end if

	if err = db.Ping(); err != nil {
		return err
	} // end if

	log.Println("Connected to Database!")

	// create schema if not existant
	_, err = db.Exec(createSchema)
	if err != nil {
		return err
	} // end if

	d.db = db

	return err
} // end Open func

func dbEnv() string {
	godotenv.Load(".env")
	return os.Getenv("DSN")
} // end dbEnv func

func (d *DB) Close() error {
	return d.db.Close()
} // end Close func
