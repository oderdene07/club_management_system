package news

import "cms/app"

func getNews() ([]*News, error) {
	news := []*News{}
	rows, err := app.DB.Query("SELECT * FROM news")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		n := &News{}
		err := rows.Scan(&n.ID, &n.Title, &n.Content, &n.CreatedAt, &n.Image, &n.MemberID)
		if err != nil {
			return nil, err
		}
		news = append(news, n)
	}
	return news, nil
}

func getNewsByID(id int64) (*News, error) {
	n := &News{}
	err := app.DB.QueryRow("SELECT * FROM news WHERE id = $1", id).Scan(&n.ID, &n.Title, &n.Content, &n.CreatedAt, &n.Image, &n.MemberID)
	if err != nil {
		return nil, err
	}
	return n, nil
}

func createNews(n *News) error {
	query := "INSERT INTO news (title, content, image, member_id) VALUES ($1, $2, $3, $4)"
	_, err := app.DB.Exec(query, n.Title, n.Content, n.Image, n.MemberID)
	if err != nil {
		return err
	}
	return nil
}

func updateNews(id int64, n *News) error {
	query := "UPDATE news SET title = $1, content = $2, image = $3 WHERE id = $4"
	_, err := app.DB.Exec(query, n.Title, n.Content, n.Image, id)
	if err != nil {
		return err
	}
	return nil
}

func deleteNews(id int64) error {
	_, err := app.DB.Exec("DELETE FROM news WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}
