package member

import (
	"cms/app"
	"regexp"

	"github.com/golang-jwt/jwt"
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

func generateToken(member *Member) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"member_id": member.ID,
	})
	return token.SignedString([]byte("my-secret-key"))
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
