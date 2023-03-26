package main

import (
	"cms/app"
	"cms/event"
	"cms/member"
	"cms/news"

	"github.com/gin-gonic/gin"
)

func routes() {
	r := gin.Default()
	// auth
	r.POST("/login", member.SignIn)
	r.POST("/register", member.SignUp)
	// r.POST("/reset", member.ResetPassword)
	r.GET("/verify/:code", member.VerifyEmail)
	r.POST("/resend", member.ResendVerificationCode)
	r.POST("/approve/:id", member.ValidateToken(), member.ValidateAdmin(), member.ApproveMember)

	// member
	r.GET("/members", member.ValidateToken(), member.GetMembers)
	r.GET("/member/:id", member.ValidateToken(), member.GetMemberByID)
	r.PUT("/member/:id", member.ValidateToken(), member.UpdateMember)
	r.DELETE("/member/:id", member.ValidateToken(), member.ValidateAdmin(), member.DeleteMember)
	// event
	r.GET("/events", member.ValidateToken(), event.GetEvents)
	r.GET("/event/:id", member.ValidateToken(), event.GetEventByID)
	r.POST("/event", member.ValidateToken(), member.ValidateAdmin(), event.CreateEvent)
	r.PUT("/event/:id", member.ValidateToken(), member.ValidateAdmin(), event.UpdateEvent)
	r.DELETE("/event/:id", member.ValidateToken(), member.ValidateAdmin(), event.DeleteEvent)
	// news
	r.GET("/news", news.GetNews)
	r.GET("/news/:id", news.GetNewsByID)
	r.POST("/news", member.ValidateToken(), member.ValidateAdmin(), news.CreateNews)
	r.PUT("/news/:id", member.ValidateToken(), member.ValidateAdmin(), news.UpdateNews)
	r.DELETE("/news/:id", news.DeleteNews)
	// image
	r.POST("/upload", member.ValidateToken(), app.UploadImage)
	r.GET("/images/:name", app.GetImage)
	r.Run()
}
