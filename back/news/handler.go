package news

import (
	"cms/app"
	"cms/member"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetNews(c *gin.Context) {
	news, err := getNews()
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", news)
}

func GetNewsByID(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	news, err := getNewsByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	creator, err := member.ServiceGetMemberByID(news.MemberID)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	news.Creator = creator.FirstName + " " + creator.LastName
	app.Responce(c, http.StatusOK, "Success", news)
}

func CreateNews(c *gin.Context) {
	var news News
	err := c.BindJSON(&news)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = createNews(&news)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func UpdateNews(c *gin.Context) {
	var news News
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	err = c.BindJSON(&news)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = updateNews(idInt, &news)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func DeleteNews(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = deleteNews(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}
