import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/auth-context";
import { getInitials } from "@/utils/get-initials";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { MemberModal } from "./members-modal";

const rowsPerPage = 12;

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.toLocaleString("en-US", { month: "short" })} ${d.toLocaleString("en-US", {
    day: "2-digit",
  })}, ${d.getFullYear()}`;
};

export const MembersTable = ({ members, loading, refresh }) => {
  const isAdmin = useAuth().user?.role === "admin";

  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMemberClick = (row) => {
    setSelectedMember(row);
    setIsModalVisible(true);
  };

  const columns = useMemo(() => {
    const handleDelete = (id) => async () => {
      await apiClient.delete(`/member/${id}`);
      refresh();
    };
    const handleChangeRole = async (event, memberID) => {
      const role = event.target.value;
      await apiClient.put(`/member/${memberID}/${role}`);
      refresh();
    };
    return [
      {
        field: "Avatar",
        headerName: "Avatar",
        flex: 1,
        minWidth: 60,
        renderCell: (params) => (
          <Avatar
            src={
              params.row.profile_picture &&
              process.env.NEXT_PUBLIC_API_URL + params.row.profile_picture
            }
            sx={{ width: 36, height: 36, fontSize: 16, mr: 2 }}
          >
            {getInitials(`${params.row.first_name} ${params.row.last_name}`)}
          </Avatar>
        ),
      },
      {
        field: "full_name",
        headerName: "Full name",
        flex: 1,
        minWidth: 180,
        valueGetter: (params) => `${params.row.first_name} ${params.row.last_name}`,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "date_joined",
        headerName: "Date Joined",
        flex: 1,
        minWidth: 130,
        valueGetter: (params) => formatDate(params.row.date_joined),
      },
      {
        field: "role",
        headerName: "Role",
        cellClassName: "actions",
        flex: 1,
        minWidth: 120,
        renderCell: ({ row }) => {
          return isAdmin ? (
            <FormControl fullWidth variant="standard" onClick={(e) => e.stopPropagation()}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={row.role}
                onChange={(e) => {
                  e.preventDefault();
                  handleChangeRole(e, row.id);
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="request">Request</MenuItem>
                <MenuItem value="unverified">Unverified</MenuItem>
              </Select>
            </FormControl>
          ) : (
            row.role
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        cellClassName: "actions",
        width: 60,
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              key={id}
              icon={
                <TrashIcon
                  style={{
                    color: "#F04438",
                    width: "24px",
                  }}
                />
              }
              label="Delete"
              onClick={handleDelete(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  }, [isAdmin, refresh]);

  return (
    <Card>
      <DataGrid
        autoHeight
        disableRowSelectionOnClick
        rows={members}
        columns={isAdmin ? columns : columns.filter((col) => col.field !== "actions")}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rowsPerPage,
            },
          },
        }}
        pageSizeOptions={[rowsPerPage]}
        loading={loading}
        onRowClick={(event) => handleMemberClick(event.row)}
        sx={{
          border: "none",
          marginX: 2,
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderColor: "primary.light",
            borderRadius: "0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderColor: "primary.light",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
            color: "primary.main",
            bgcolor: "primary.light",
          },
        }}
      />
      <MemberModal
        selectedMember={selectedMember}
        isModalVisible={isModalVisible}
        handleCloseModal={() => setIsModalVisible(false)}
      />
    </Card>
  );
};

MembersTable.propTypes = {
  members: PropTypes.array,
};
