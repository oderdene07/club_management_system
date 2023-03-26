package app

import (
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func UploadImage(c *gin.Context) {
	var imageUrl string
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		ErrorLogger.Println(err)
		Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	filename := header.Filename
	// create directory if not exist
	if _, err := os.Stat("./public/images"); os.IsNotExist(err) {
		err := os.MkdirAll("./public/images", 0755)
		if err != nil {
			ErrorLogger.Println(err)
			Responce(c, http.StatusInternalServerError, err.Error(), nil)
			return
		}
	}
	// create file
	out, err := os.Create("./public/images/" + filename)
	if err != nil {
		ErrorLogger.Println(err)
		Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	defer out.Close()
	// copy file
	_, err = io.Copy(out, file)
	if err != nil {
		ErrorLogger.Println(err)
		Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	imageUrl = "/images/" + filename
	Responce(c, http.StatusOK, "Success", imageUrl)
}

func GetImage(c *gin.Context) {
	name := c.Param("name")
	c.File("./public/images/" + name)
}
