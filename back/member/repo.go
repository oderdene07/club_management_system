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

func getMemberByID(id int64) (*Member, error) {
	member := &Member{}
	query := "SELECT id, first_name, last_name, email, phone_number, occupation, role, date_joined, profile_picture, profile_description FROM members WHERE id = $1"
	err := app.DB.QueryRow(query, id).Scan(&member.ID, &member.FirstName, &member.LastName, &member.Email, &member.PhoneNumber, &member.Occupation, &member.Role, &member.DateJoined, &member.ProfilePicture, &member.ProfileDescription)

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
	query := "UPDATE members SET first_name = $1, last_name = $2, email = $3, phone_number = $4, occupation = $5, role = $6, date_joined = $7, profile_picture = $8, profile_description = $9 WHERE id = $10"
	_, err := app.DB.Exec(query, member.FirstName, member.LastName, member.Email, member.PhoneNumber, member.Occupation, member.Role, member.DateJoined, member.ProfilePicture, member.ProfileDescription, id)
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

func updateMemberRole(id int64, memberRole string) error {
	query := "UPDATE members SET role = $1 WHERE id = $2"
	_, err := app.DB.Exec(query, memberRole, id)
	if err != nil {
		return err
	}
	return nil
}
