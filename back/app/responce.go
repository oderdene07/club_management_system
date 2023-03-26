package app

import "github.com/gin-gonic/gin"

type responce struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func Responce(c *gin.Context, status int, message string, data interface{}) {
	c.JSON(status, responce{
		Status:  status,
		Message: message,
		Data:    data,
	})
}
