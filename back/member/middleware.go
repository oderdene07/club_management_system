package member

import (
	"cms/app"
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func ValidateToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			app.ErrorLogger.Println("Authorization header is empty")
			app.Responce(c, http.StatusUnauthorized, "Authorization header is empty", nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is empty"})
			return
		}
		idToken := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := app.AuthClient.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			app.ErrorLogger.Println(err)
			app.Responce(c, http.StatusUnauthorized, err.Error(), nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		member, err := getMemberByUID(token.UID)
		if err != nil {
			app.ErrorLogger.Println(err)
			app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
			c.Abort()
			return
		}
		if member == nil {
			app.ErrorLogger.Println("no such member found")
			app.Responce(c, http.StatusUnauthorized, "no such member found", nil)
			c.Abort()
			return
		}
		c.Set("member", *member)
		c.Next()
	}
}

// check if admin
func ValidateAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		member, _ := c.Get("member")
		memberObj := member.(Member)
		if memberObj.Role != "admin" {
			app.ErrorLogger.Println("not admin")
			app.Responce(c, http.StatusUnauthorized, "not admin", nil)
			c.Abort()
			return
		}
		c.Next()
	}
}
