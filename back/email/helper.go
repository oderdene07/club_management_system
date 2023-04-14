package email

import (
	"fmt"
	"math/rand"
	"net/smtp"
	"strings"
)

func (s *smtpServer) Address() string {
	return s.host + ":" + s.port
}

func CodeGenerator() string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 10)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func SendEmail(subject, body string, to []string) error {
	from := "oderdene.dev@gmail.com"
	password := "zxtzrqgofuddwemj"

	smtpServer := smtpServer{host: "smtp.gmail.com", port: "587"}

	auth := smtp.PlainAuth("", from, password, smtpServer.host)

	headers := make(map[string]string)
	headers["From"] = from
	headers["To"] = strings.Join(to, ", ")
	headers["Subject"] = subject

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + body

	err := smtp.SendMail(smtpServer.Address(), auth, from, to, []byte(message))
	if err != nil {
		return fmt.Errorf("smtp error: %s", err)
	}
	return nil
}
