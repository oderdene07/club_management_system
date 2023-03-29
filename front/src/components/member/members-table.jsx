import PropTypes from "prop-types";
import { Avatar, Card, Box } from "@mui/material";
import { getInitials } from "@/utils/get-initials";
import { ShieldCheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useState } from "react";
import { MemberModal } from "./members-modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useAuth } from "@/contexts/auth-context";

const rowsPerPage = 12;

export const MembersTable = ({ members, loading }) => {
  const isAdmin = useAuth().user?.role === "admin";

  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMemberClick = (row) => {
    setSelectedMember(row);
    setIsModalVisible(true);
  };

  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {});
    },
    []
  );

  const toggleAdmin = useCallback(
    (id) => () => {
      setTimeout(() => {});
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        field: "full_name",
        headerName: "Full name",
        flex: 1,
        minWidth: 270,
        renderCell: (params) => (
          <>
            <Avatar
              src={params.row.profile_picture}
              sx={{ width: 36, height: 36, fontSize: 16, mr: 2 }}
            >
              {getInitials(`${params.row.first_name} ${params.row.last_name}`)}
            </Avatar>
            {params.row.first_name} {params.row.last_name}
          </>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 270,
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "date_joined",
        headerName: "Date Joined",
        flex: 1,
        minWidth: 150,
        valueGetter: (params) => new Date(params.row.date_joined).toDateString(),
      },
      {
        field: "role",
        headerName: "Role",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={
              <ShieldCheckIcon
                style={{
                  color: "#605BFF",
                  width: "28px",
                }}
              />
            }
            label="Toggle Admin"
            showInMenu
            onClick={toggleAdmin(params.id)}
            sx={{
              color: "primary.main",
            }}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={
              <TrashIcon
                style={{
                  color: "#F04438",
                  width: "28px",
                }}
              />
            }
            label="Delete"
            showInMenu
            onClick={deleteUser(params.id)}
            sx={{
              mt: 1,
              color: "error.main",
            }}
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin]
  );

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
