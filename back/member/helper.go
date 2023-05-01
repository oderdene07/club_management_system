package member

import (
	"cms/app"
	"cms/email"
	"context"
	"regexp"

	"firebase.google.com/go/auth"
	"golang.org/x/crypto/bcrypt"
)

func isValidEmail(email string) bool {
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	regex := regexp.MustCompile(pattern)
	return regex.MatchString(email)
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func verifyPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func isDuplicateEmail(email string) bool {
	member, err := getMemberByEmail(email)
	if err != nil {
		app.ErrorLogger.Println(err)
	}
	if member == nil {
		return false
	}
	return true
}

func (m *Member) CopyFromSignUp(s *SignUpData) {
	m.FirstName = s.FirstName
	m.LastName = s.LastName
	m.Email = s.Email
	m.Password = s.Password
}

func getMemberFullNameByID(id int64) (string, error) {
	member, err := getMemberByID(id)
	if err != nil {
		app.ErrorLogger.Println(err)
		return "", err
	}
	return member.FirstName + " " + member.LastName, nil
}

func sendEmailToAdmin(id int64) {
	adminEmails, err := getAdminEmails()
	if err != nil {
		app.ErrorLogger.Println(err)
	}

	name, err := getMemberFullNameByID(id)
	if err != nil {
		app.ErrorLogger.Println(err)
	}

	err = email.SendEmailToAdmin(adminEmails, name)
	if err != nil {
		app.ErrorLogger.Println(err)
	}
}

func sendEmailForRoleUpdate(id int64, role string) {
	member, err := getMemberByID(id)
	if err != nil {
		app.ErrorLogger.Println(err)
	}

	err = email.SendEmailForRoleUpdate(member.Email, role)
	if err != nil {
		app.ErrorLogger.Println(err)
	}
}

func createFirebaseUser(email, password string) error {
	params := (&auth.UserToCreate{}).
		Email(email).
		EmailVerified(false).
		Password(password)

	firebaseUser, err := app.AuthClient.CreateUser(context.Background(), params)

	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}

	err = updateFirebaseUID(email, firebaseUser.UID)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}

	return nil
}

func deleteMemberFromFirebase(uid string) error {
	err := app.AuthClient.DeleteUser(context.Background(), uid)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}

func updateFirebaseUserVerify(id int64) error {
	member, err := getMemberByID(id)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}

	uid := member.FirebaseUID
	params := (&auth.UserToUpdate{}).EmailVerified(true)

	_, err = app.AuthClient.UpdateUser(context.Background(), uid, params)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}

func updateFirebaseUserPassword(uid, password string) error {
	params := (&auth.UserToUpdate{}).Password(password)

	_, err := app.AuthClient.UpdateUser(context.Background(), uid, params)
	if err != nil {
		app.ErrorLogger.Println(err)
		return err
	}
	return nil
}
