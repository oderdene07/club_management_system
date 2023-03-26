package email

type smtpServer struct {
	host string
	port string
}

type Email struct {
	ID         int64  `json:"id"`
	Title      string `json:"title"`
	Content    string `json:"content"`
	Type       string `json:"type"`
	Code       string `json:"code"`
	IsCodeUsed bool   `json:"is_code_used"`
	CreatedAt  string `json:"created_at"`
	MemberID   int64  `json:"member_id"`
}
