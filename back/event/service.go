package event

import (
	"time"
)

func isEqualDate(t1, t2 time.Time) bool {
	return t1.Year() == t2.Year() && t1.Month() == t2.Month() && t1.Day() == t2.Day()
}

func ServiceGetUpcomingEvents() ([]*Event, error) {
	events, err := getUpcomingEvents()
	if err != nil {
		return nil, err
	}
	upcomingEvents := []*Event{}
	for _, event := range events {
		if isEqualDate(event.StartDate, time.Now().AddDate(0, 0, 1)) || isEqualDate(event.StartDate, time.Now().AddDate(0, 0, 3)) || isEqualDate(event.StartDate, time.Now().AddDate(0, 0, 7)) {
			upcomingEvents = append(upcomingEvents, event)
		}
	}
	if len(upcomingEvents) == 0 {
		return nil, nil
	}
	return upcomingEvents, nil
}
