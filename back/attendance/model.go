package attendance

type EventAttendance struct {
	ID       int64  `json:"id"`
	MemberID int64  `json:"member_id"`
	EventID  int64  `json:"event_id"`
	Status   string `json:"status"`
	Attended bool   `json:"attended"`
}

type EventAttendanceStatus struct {
	Going    int64 `json:"going"`
	NotGoing int64 `json:"not_going"`
	Maybe    int64 `json:"maybe"`
}
