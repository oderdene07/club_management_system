package member

import (
	"cms/app"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func ValidateToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.GetHeader("Authorization")
		if tokenStr == "" {
			app.ErrorLogger.Println("token is empty")
			app.Responce(c, http.StatusUnauthorized, "token is empty", nil)
			c.Abort()
			return
		}
		c.Set("token", tokenStr)

		var claims AuthenticateClaims
		token, err := jwt.ParseWithClaims(tokenStr, &claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("invalid token")
			}
			return []byte("my-secret-key"), nil
		})
		if err != nil {
			app.ErrorLogger.Println(err)
			app.Responce(c, http.StatusUnauthorized, "invalid token", nil)
			c.Abort()
			return
		}
		if !token.Valid {
			app.ErrorLogger.Println("invalid token")
			app.Responce(c, http.StatusUnauthorized, "invalid token", nil)
			c.Abort()
			return
		}

		member, err := getMemberByID(claims.MemberID)
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
