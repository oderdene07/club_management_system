package event

import (
	"cms/app"
	"database/sql"
)

func getEvents() ([]*Event, error) {
	events := []*Event{}
	rows, err := app.DB.Query("SELECT * FROM events")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		event := &Event{}
		err := rows.Scan(&event.ID, &event.Title, &event.StartDate, &event.EndDate, &event.Location, &event.Description, &event.Image)
		if err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}

func getUpcomingEventsCount() (int, error) {
	var count int
	err := app.DB.QueryRow("SELECT COUNT(*) FROM events WHERE start_date > NOW()").Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func getEventByID(id int64) (*Event, error) {
	event := &Event{}
	err := app.DB.QueryRow("SELECT * FROM events WHERE id = $1", id).Scan(&event.ID, &event.Title, &event.StartDate, &event.EndDate, &event.Location, &event.Description, &event.Image)
	if err != nil {
		return nil, err
	}
	return event, nil
}

func createEvent(event *Event) error {
	query := "INSERT INTO events (title, description, location, start_date, end_date, image) VALUES ($1, $2, $3, $4, $5, $6)"
	_, err := app.DB.Exec(query, event.Title, event.Description, event.Location, event.StartDate, event.EndDate, event.Image)
	if err != nil {
		return err
	}
	return nil
}

func updateEvent(id int64, event *Event) error {
	query := "UPDATE events SET title = $1, description = $2, location = $3, start_date = $4, end_date = $5, image = $6 WHERE id = $7"
	_, err := app.DB.Exec(query, event.Title, event.Description, event.Location, event.StartDate, event.EndDate, event.Image, id)
	if err != nil {
		return err
	}
	return nil
}

func deleteEvent(id int64) error {
	_, err := app.DB.Exec("DELETE FROM events WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}

func getUpcomingEvents() ([]*Event, error) {
	events := []*Event{}
	rows, err := app.DB.Query("SELECT * FROM events WHERE start_date > NOW()")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		event := &Event{}
		err := rows.Scan(&event.ID, &event.Title, &event.StartDate, &event.EndDate, &event.Location, &event.Description, &event.Image)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}
