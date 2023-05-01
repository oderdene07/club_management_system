package app

import (
	"context"
	"database/sql"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	_ "github.com/lib/pq"
	"google.golang.org/api/option"
)

var DB *sql.DB
var AuthClient *auth.Client

var (
	WarningLogger *log.Logger
	InfoLogger    *log.Logger
	ErrorLogger   *log.Logger
)

func FirebaseInit() {
	opt := option.WithCredentialsFile("./app/serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	AuthClient, err = app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error initializing firebase auth: %v\n", err)
	}
}

func InitDB() {
	var err error

	DB, err = sql.Open("postgres", "postgres://odko:password@localhost/cms?sslmode=disable")
	if err != nil {
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	}
}

func InitLog() {
	file, err := os.OpenFile("logs.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	InfoLogger = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	WarningLogger = log.New(file, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLogger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}
