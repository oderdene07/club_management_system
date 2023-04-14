package email

import (
	"cms/app"
	"cms/event"
)

func SendVerificationEmail(id int64, email string) error {
	code := CodeGenerator()
	err := saveEmailVerificationCode(id, code)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}

	url := "http://localhost:3000/verify/" + code
	subject := "Verify your email address"
	body := "Please use link below to verify your email address. :)\n" + url
	err = SendEmail(subject, body, []string{email})
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}

func DeleteEmail(id int64) error {
	err := deleteEmail(id)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}

func VerifyEmail(code string) (int64, error) {
	id, err := getMemberIDByCode(code)
	if err != nil {
		app.ErrorLogger.Println(err)
		return 0, err
	}
	err = updateEmailStatus(id)
	if err != nil {
		app.ErrorLogger.Println(err)
		return 0, err
	}
	return id, nil
}

func SendEmailForUpcomingEvents(email string, events []*event.Event) error {
	subject := "Upcoming Events"
	body := "Upcoming Events:\n\n"
	for _, event := range events {
		date := event.StartDate
		body += "Event: " + event.Title + "\n" + "When: " + date.Format("Mon, 02 Jan 2006 15:04:05") + "\n" + "Where: " + event.Location + "\n" + "Description: " + event.Description + "\n\n"
	}

	err := SendEmail(subject, body, []string{email})
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}
