package member

import (
	"cms/app"
	"database/sql"
)

func getMembers() ([]*Member, error) {
	members := []*Member{}
	query := "SELECT id, first_name, last_name, email, phone_number, occupation, role, date_joined, profile_picture, profile_description FROM members"
	rows, err := app.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		member := &Member{}
		err := rows.Scan(&member.ID, &member.FirstName, &member.LastName, &member.Email, &member.PhoneNumber, &member.Occupation, &member.Role, &member.DateJoined, &member.ProfilePicture, &member.ProfileDescription)
		if err != nil {
			return nil, err
		}
		members = append(members, member)
	}

	return members, nil
}

func getMembersCount() (int, error) {
	var count int
	err := app.DB.QueryRow("SELECT COUNT(*) FROM members").Scan(&count)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func getMemberByID(id int64) (*Member, error) {
	member := &Member{}
	query := "SELECT id, first_name, last_name, email, phone_number, occupation, role, date_joined, profile_picture, profile_description, uid FROM members WHERE id = $1"
	err := app.DB.QueryRow(query, id).Scan(&member.ID, &member.FirstName, &member.LastName, &member.Email, &member.PhoneNumber, &member.Occupation, &member.Role, &member.DateJoined, &member.ProfilePicture, &member.ProfileDescription, &member.FirebaseUID)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return member, nil
}

func getMemberByUID(uid string) (*Member, error) {
	member := &Member{}
	query := "SELECT id, first_name, last_name, email, phone_number, occupation, role, date_joined, profile_picture, profile_description FROM members WHERE uid = $1"
	err := app.DB.QueryRow(query, uid).Scan(&member.ID, &member.FirstName, &member.LastName, &member.Email, &member.PhoneNumber, &member.Occupation, &member.Role, &member.DateJoined, &member.ProfilePicture, &member.ProfileDescription)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return member, nil
}

func createMember(member *Member) (int64, error) {
	query := "INSERT INTO members (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'unverified') RETURNING id"
	var id int64
	err := app.DB.QueryRow(query, member.FirstName, member.LastName, member.Email, member.Password).Scan(&id)

	if err != nil {
		return 0, err
	}
	return id, nil
}

func updateMember(id int64, member *Member) error {
	query := "UPDATE members SET first_name = $1, last_name = $2, email = $3, phone_number = $4, occupation = $5, profile_picture = $6, profile_description = $7 WHERE id = $8"
	_, err := app.DB.Exec(query, member.FirstName, member.LastName, member.Email, member.PhoneNumber, member.Occupation, member.ProfilePicture, member.ProfileDescription, id)
	if err != nil {
		return err
	}
	return nil
}

func deleteMember(id int64) error {
	_, err := app.DB.Exec("DELETE FROM members WHERE id = $1", id)
	if err != nil {
		return err
	}
	return nil
}

func getMemberByEmail(email string) (*Member, error) {
	member := &Member{}
	query := "SELECT id, first_name, last_name, email, password, phone_number, occupation, role, date_joined, profile_picture, profile_description FROM members WHERE email = $1"
	err := app.DB.QueryRow(query, email).Scan(&member.ID, &member.FirstName, &member.LastName, &member.Email, &member.Password, &member.PhoneNumber, &member.Occupation, &member.Role, &member.DateJoined, &member.ProfilePicture, &member.ProfileDescription)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return member, nil
}

func getAdminEmails() (emails []string, err error) {
	rows, err := app.DB.Query("SELECT email FROM members WHERE role = 'admin'")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var email string
		err := rows.Scan(&email)
		if err != nil {
			return nil, err
		}
		emails = append(emails, email)
	}
	return emails, err
}

func updateMemberRole(id int64, memberRole string) error {
	query := "UPDATE members SET role = $1 WHERE id = $2"
	_, err := app.DB.Exec(query, memberRole, id)
	if err != nil {
		return err
	}
	return nil
}

func updateMemberPassword(id int64, password string) error {
	query := "UPDATE members SET password = $1 WHERE id = $2"
	_, err := app.DB.Exec(query, password, id)
	if err != nil {
		return err
	}
	return nil
}

func deleteAttendanceByMemberID(id int64) error {
	_, err := app.DB.Exec("DELETE FROM event_attendance WHERE member_id = $1", id)
	if err != nil {
		return err
	}
	return nil
}

func deleteNewsByMemberID(id int64) error {
	_, err := app.DB.Exec("DELETE FROM news WHERE member_id = $1", id)
	if err != nil {
		return err
	}
	return nil
}

func updateFirebaseUID(email, uid string) error {
	query := "UPDATE members SET uid = $1 WHERE email = $2"
	_, err := app.DB.Exec(query, uid, email)
	if err != nil {
		return err
	}
	return nil
}
