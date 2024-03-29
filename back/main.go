package main

import (
	"cms/app"
	"cms/member"
	"time"

	"github.com/go-co-op/gocron"
	_ "github.com/lib/pq"
)

func main() {
	loc, err := time.LoadLocation("Asia/Ulaanbaatar")
	if err != nil {
		app.ErrorLogger.Println(err)
	}
	time.Local = loc

	app.InitDB()
	app.InitLog()
	app.FirebaseInit()
	app.InfoLogger.Println("connected to database")

	scheduler := gocron.NewScheduler(time.UTC)
	_, err = scheduler.Every(1).Day().At("18:00").Do(member.SendEmailForUpcomingEvents)
	if err != nil {
		app.ErrorLogger.Println(err)
	}
	go scheduler.StartBlocking()

	routes()
}
