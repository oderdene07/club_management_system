package news

type News struct {
	ID        int64  `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	Image     string `json:"image"`
	MemberID  int64  `json:"member_id"`
}
