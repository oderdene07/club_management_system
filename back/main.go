package main

import (
	"cms/app"

	_ "github.com/lib/pq"
)

func main() {
	app.InitDB()
	app.InfoLogger.Println("connected to database")

	app.InitLog()

	routes()
}
