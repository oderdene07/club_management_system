package email

import (
	"cms/app"
)

func SendVerificationEmail(id int64, email string) error {
	code := CodeGenerator()
	err := saveEmailVerificationCode(id, code)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}

	url := "http://localhost:8080/verify/" + code
	subject := "Verify your email address"
	body := "Please use link below to verify your email address. :)\n" + url
	SendEmail(subject, body, []string{email})
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
