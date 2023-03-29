package event

type Event struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	Location    string `json:"location"`
	Description string `json:"description"`
	Image       string `json:"image"`
}
