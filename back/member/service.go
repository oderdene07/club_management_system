package member

func ServiceGetMemberByID(id int64) (*Member, error) {
	return getMemberByID(id)
}
