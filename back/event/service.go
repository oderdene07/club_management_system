package event

func ServiceGetUpcomingEvents() ([]*Event, error) {
	return getUpcomingEvents()
}
