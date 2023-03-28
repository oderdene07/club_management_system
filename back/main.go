package main

import (
	"cms/app"

	_ "github.com/lib/pq"
)

func main() {
	app.InitDB()
	app.InitLog()
	app.InfoLogger.Println("connected to database")

	routes()
}
