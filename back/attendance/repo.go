package attendance

import "cms/app"

func getEventAttendance(eventID int64) ([]*EventAttendance, error) {
	rows, err := app.DB.Query("SELECT * FROM event_attendance WHERE event_id = $1", eventID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	eventAttendance := []*EventAttendance{}
	for rows.Next() {
		ea := &EventAttendance{}
		err := rows.Scan(&ea.ID, &ea.MemberID, &ea.EventID, &ea.Status, &ea.Attended)
		if err != nil {
			return nil, err
		}
		eventAttendance = append(eventAttendance, ea)
	}

	return eventAttendance, nil
}

func getMemberEventAttendance(eventID, memberID int64) (string, error) {
	var status string
	err := app.DB.QueryRow("SELECT status FROM event_attendance WHERE event_id = $1 AND member_id = $2", eventID, memberID).Scan(&status)
	if err != nil {
		return "", err
	}

	return status, nil
}

func createEventAttendance(eventAttendance EventAttendance) error {
	_, err := app.DB.Exec("INSERT INTO event_attendance (member_id, event_id, status, attended) VALUES ($1, $2, $3, $4)", eventAttendance.MemberID, eventAttendance.EventID, eventAttendance.Status, false)
	if err != nil {
		return err
	}

	return nil
}

func updateEventAttendance(eventAttendance EventAttendance) error {
	_, err := app.DB.Exec("UPDATE event_attendance SET status = $1 WHERE event_id = $2 AND member_id = $3", eventAttendance.Status, eventAttendance.EventID, eventAttendance.MemberID)
	if err != nil {
		return err
	}

	return nil
}

func getEventAttendanceCount(eventID int64, status string) (int64, error) {
	var count int64
	err := app.DB.QueryRow("SELECT COUNT(*) FROM event_attendance WHERE event_id = $1 AND status = $2", eventID, status).Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func getEventVoteStatusByMemberID(eventID, memberID int64) (string, error) {
	var status string
	err := app.DB.QueryRow("SELECT status FROM event_attendance WHERE event_id = $1 AND member_id = $2", eventID, memberID).Scan(&status)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			return "", nil
		}
		return "", err
	}

	return status, nil
}
