package event

import "time"

type Event struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	Location    string    `json:"location"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
}
