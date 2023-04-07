package member

import (
	"cms/app"
	"cms/email"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetMembers(c *gin.Context) {
	members, err := getMembers()
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", members)
}

func GetMembersCount(c *gin.Context) {
	count, err := getMembersCount()
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", count)
}

func GetMemberByID(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	member, err := getMemberByID(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", member)
}

func GetMemberByToken(c *gin.Context) {
	member := c.MustGet("member").(Member)
	app.Responce(c, http.StatusOK, "Success", member)
}

func UpdateMember(c *gin.Context) {
	var member Member
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	tokenMemberID := c.MustGet("member").(Member).ID
	if idInt != tokenMemberID {
		app.ErrorLogger.Println("Unauthorized")
		app.Responce(c, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	err = c.BindJSON(&member)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	err = updateMember(idInt, &member)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	member, err := getMemberByID(idInt)
	if member == nil {
		app.ErrorLogger.Println("Member not found")
		app.Responce(c, http.StatusBadRequest, "Member not found", nil)
		return
	}

	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = email.DeleteEmail(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = deleteMember(idInt)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	app.Responce(c, http.StatusOK, "Success", nil)
}

func SignUp(c *gin.Context) {
	var signUpData SignUpData
	var member Member
	err := c.BindJSON(&signUpData)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}
	if !isValidEmail(signUpData.Email) {
		app.ErrorLogger.Println("Invalid email address")
		app.Responce(c, http.StatusBadRequest, "Invalid email address", nil)
		return
	}

	if isDuplicateEmail(signUpData.Email) {
		app.ErrorLogger.Println("Duplicate email address")
		app.Responce(c, http.StatusBadRequest, "Duplicate email address", nil)
		return
	}

	hashedPassword, err := hashPassword(signUpData.Password)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	signUpData.Password = hashedPassword

	member.CopyFromSignUp(&signUpData)

	id, err := createMember(&member)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = email.SendVerificationEmail(id, signUpData.Email)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}

func SignIn(c *gin.Context) {
	var signInData SignInData
	err := c.BindJSON(&signInData)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	member, err := getMemberByEmail(signInData.Email)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	if member == nil {
		app.ErrorLogger.Println("Invalid email address or password")
		app.Responce(c, http.StatusBadRequest, "Invalid email address or password", nil)
		return
	}

	if !verifyPassword(signInData.Password, member.Password) {
		app.ErrorLogger.Println("Invalid email address or password")
		app.Responce(c, http.StatusBadRequest, "Invalid email address or password", nil)
		return
	}

	if member.Role == "unverified" {
		app.ErrorLogger.Println("Verify your email")
		app.Responce(c, http.StatusBadRequest, "Verify your email", nil)
		return
	}

	if member.Role == "request" {
		app.ErrorLogger.Println("Wait for admin approval")
		app.Responce(c, http.StatusBadRequest, "Wait for admin approval", nil)
		return
	}

	token, err := generateToken(member)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	loginResponse := LoginResponse{
		Token:  token,
		Member: member,
	}

	app.Responce(c, http.StatusOK, "Success", loginResponse)
}

func VerifyEmail(c *gin.Context) {
	code := c.Param("code")
	id, err := email.VerifyEmail(code)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = updateMemberRole(id, "request")
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}

func ResendVerificationCode(c *gin.Context) {
	var emailData EmailData
	err := c.BindJSON(&emailData)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	member, err := getMemberByEmail(emailData.Email)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = email.SendVerificationEmail(member.ID, emailData.Email)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}

func UpdateMemberRole(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	role := c.Param("role")

	if role != "admin" && role != "member" && role != "request" && role != "unverified" {
		app.ErrorLogger.Println("Invalid role")
		app.Responce(c, http.StatusBadRequest, "Invalid role", nil)
		return
	}

	err = updateMemberRole(idInt, role)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}

func ChangeMemberPassword(c *gin.Context) {
	var signInData SignInData
	err := c.BindJSON(&signInData)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	member, err := getMemberByEmail(signInData.Email)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	if member == nil {
		app.ErrorLogger.Println("Invalid email address")
		app.Responce(c, http.StatusBadRequest, "Invalid email address", nil)
		return
	}

	if verifyPassword(signInData.Password, member.Password) {
		app.ErrorLogger.Println("Cannot use same password")
		app.Responce(c, http.StatusBadRequest, "Cannot use same password", nil)
		return
	}

	hashedPassword, err := hashPassword(signInData.Password)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	err = updateMemberPassword(member.ID, hashedPassword)
	if err != nil {
		app.ErrorLogger.Println(err)
		app.Responce(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	app.Responce(c, http.StatusOK, "Success", nil)
}
