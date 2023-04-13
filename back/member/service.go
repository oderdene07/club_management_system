package member

import (
	"cms/app"
	"cms/email"
	"cms/event"
	"log"
)

func ServiceGetMemberByID(id int64) (*Member, error) {
	return getMemberByID(id)
}

func ServiceGetMembers() ([]*Member, error) {
	return getMembers()
}

func SendEmailForUpcomingEvents() {
	log.Println("Sending email for upcoming events...")
	members, err := getMembers()
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}

	events, err := event.ServiceGetUpcomingEvents()
	if err != nil {
		app.ErrorLogger.Println(err)
		return
	}

	for _, member := range members {
		if member.Email != "" {
			err = email.SendEmailForUpcomingEvents(member.Email, events)
			if err != nil {
				app.ErrorLogger.Println(err)
				return
			}
		}
	}
}
