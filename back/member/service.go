package member

import (
	"cms/app"
	"cms/email"
	"cms/event"
)

func ServiceGetMemberByID(id int64) (*Member, error) {
	return getMemberByID(id)
}

func ServiceGetMembers() ([]*Member, error) {
	return getMembers()
}

func SendEmailForUpcomingEvents() {
	app.InfoLogger.Println("Sending email for upcoming events")
	members, err := getMembers()
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}

	upcomingEvents, err := event.ServiceGetUpcomingEvents()
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}

	if upcomingEvents == nil {
		app.InfoLogger.Println("No upcoming events")
		return
	}

	for _, member := range members {
		if member.Email != "" {
			err = email.SendEmailForUpcomingEvents(member.Email, upcomingEvents)
			if err != nil {
				app.ErrorLogger.Println(err)
				return
			}
		}
	}
}
