package attendance

import (
	"cms/app"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func VoteEvent(c *gin.Context) {
	var eventAttendance EventAttendance
	err := c.BindJSON(&eventAttendance)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	_, err = getEventAttendance(eventAttendance.EventID, eventAttendance.MemberID)
	if err != nil {
		// vote does not exist, create
		err = createEventAttendance(eventAttendance)
		if err != nil {
			app.ErrorLogger.Println(err)
			app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
			return
		}
	} else {
		// vote exists, update
		err = updateEventAttendance(eventAttendance)
		if err != nil {
			app.ErrorLogger.Println(err)
			app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
			return
		}
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}

func GetVoteEvent(c *gin.Context) {
	var eventAttendanceStatus EventAttendanceStatus
	eventID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	countGoing, err := getEventAttendanceCount(eventID, "going")
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	countNotGoing, err := getEventAttendanceCount(eventID, "not going")
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	countMaybe, err := getEventAttendanceCount(eventID, "maybe")
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	eventAttendanceStatus.Going = countGoing
	eventAttendanceStatus.NotGoing = countNotGoing
	eventAttendanceStatus.Maybe = countMaybe

	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", eventAttendanceStatus)
}

func GetMemberVoteStatus(c *gin.Context) {
	eventID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	memberID, err := strconv.ParseInt(c.Param("memberID"), 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	eventVoteStatus, err := getEventVoteStatusByMemberID(eventID, memberID)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", eventVoteStatus)
}
