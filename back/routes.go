package main

import (
	"cms/app"
	"cms/attendance"
	"cms/event"
	"cms/member"
	"cms/news"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func routes() {
	r := gin.Default()
	r.Use(CORSMiddleware())
	// auth
	r.POST("/login", member.SignIn)
	r.POST("/register", member.SignUp)
	// r.POST("/reset", member.ResetPassword)
	r.GET("/verify/:code", member.VerifyEmail)
	r.POST("/resend", member.ResendVerificationCode)
	// member
	r.GET("/members", member.ValidateToken(), member.GetMembers)
	r.GET("/members/count", member.ValidateToken(), member.GetMembersCount)
	r.GET("/member/:id", member.ValidateToken(), member.GetMemberByID)
	r.GET("/member", member.ValidateToken(), member.GetMemberByToken)
	r.PUT("/member/:id", member.ValidateToken(), member.UpdateMember)
	r.POST("/member/password", member.ValidateToken(), member.ChangeMemberPassword)
	r.PUT("/member/:id/:role", member.ValidateToken(), member.ValidateAdmin(), member.UpdateMemberRole)
	r.DELETE("/member/:id", member.ValidateToken(), member.ValidateAdmin(), member.DeleteMember)
	// event
	r.GET("/events", member.ValidateToken(), event.GetEvents)
	r.GET("/events/count", member.ValidateToken(), event.GetUpcomingEventsCount)
	r.GET("/event/:id", member.ValidateToken(), event.GetEventByID)
	r.POST("/event", member.ValidateToken(), member.ValidateAdmin(), event.CreateEvent)
	r.PUT("/event/:id", member.ValidateToken(), member.ValidateAdmin(), event.UpdateEvent)
	r.DELETE("/event/:id", member.ValidateToken(), member.ValidateAdmin(), event.DeleteEvent)
	// attendance
	r.GET("/event/:id/attendance", member.ValidateToken(), attendance.GetEventAttendance)
	r.GET("/event/:id/vote", member.ValidateToken(), attendance.GetVoteEvent)
	r.GET("/event/:id/vote/:memberID", member.ValidateToken(), attendance.GetMemberVoteStatus)
	r.POST("/event/vote", member.ValidateToken(), attendance.VoteEvent)
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
