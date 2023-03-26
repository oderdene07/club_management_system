package email

import (
	"cms/app"
)

func saveEmailVerificationCode(id int64, code string) error {
	query := "INSERT INTO emails (type, code, member_id) VALUES ('verification', $1, $2)"
	_, err := app.DB.Exec(query, code, id)
	if err != nil {
		return err
	}
	return nil
}

func getMemberIDByCode(code string) (int64, error) {
	var id int64
	query := "SELECT member_id FROM emails WHERE code = $1 AND is_code_used = false AND created_at > NOW() - INTERVAL '30 minutes'"
	err := app.DB.QueryRow(query, code).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

func updateEmailStatus(id int64) error {
	res, err := app.DB.Exec("UPDATE emails SET is_code_used = true WHERE member_id = $1", id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return err
	}
	return nil
}

func deleteEmail(id int64) error {
	_, err := app.DB.Exec("DELETE FROM emails WHERE member_id = $1", id)
	if err != nil {
		return err
	}
	return nil
}
