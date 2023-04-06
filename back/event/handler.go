package event

import (
	"cms/app"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetEvents(c *gin.Context) {
	events, err := getEvents()
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", events)
}

func GetUpcomingEventsCount(c *gin.Context) {
	count, err := getUpcomingEventsCount()
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", count)
}

func GetEventByID(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	event, err := getEventByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", event)
}

func CreateEvent(c *gin.Context) {
	var event Event
	err := c.BindJSON(&event)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = createEvent(&event)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func UpdateEvent(c *gin.Context) {
	var event Event
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	err = c.BindJSON(&event)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = updateEvent(idInt, &event)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	err = deleteEvent(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}
