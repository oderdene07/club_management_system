package member

import "github.com/golang-jwt/jwt"

type AuthenticateClaims struct {
	MemberID int64 `json:"member_id"`
	jwt.StandardClaims
}

type SignUpData struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type EmailData struct {
	Email string `json:"email"`
}

type SignInData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Member struct {
	ID                 int64  `json:"id"`
	FirstName          string `json:"first_name"`
	LastName           string `json:"last_name"`
	Email              string `json:"email"`
	Password           string `json:"-"`
	PhoneNumber        string `json:"phone_number"`
	Occupation         string `json:"occupation"`
	Role               string `json:"role"`
	DateJoined         string `json:"date_joined"`
	ProfilePicture     string `json:"profile_picture"`
	ProfileDescription string `json:"profile_description"`
}
