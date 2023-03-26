import PropTypes from "prop-types";
import { Avatar, Card, Box, Typography } from "@mui/material";
import { getInitials } from "src/utils/get-initials";
import { ShieldCheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useState } from "react";
import { MemberModal } from "./members-modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const rowsPerPage = 14;

export const MembersTable = ({ members }) => {
  const [rows, setRows] = useState(members);

  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMemberClick = (row) => {
    setSelectedMember(row);
    setIsModalVisible(true);
  };

  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows(
          rows.filter((row) => {
            return row.id !== id;
          })
        );
      });
    },
    [rows, setRows]
  );

  const toggleAdmin = useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) =>
          prevRows.map((row) => {
            if (row.id === id) {
              row.role === "admin" ? (row.role = "member") : (row.role = "admin");
            }
            return row;
          })
        );
      });
    },
    [setRows]
  );

  const columns = useMemo(
    () => [
      {
        field: "full_name",
        headerName: "Full name",
        width: 250,
        renderCell: (params) => (
          <>
            <Avatar
              src={params.row.profile_picture}
              sx={{ width: 36, height: 36, fontSize: 16, mr: 2 }}
            >
              {getInitials(`${params.row.first_name} ${params.row.last_name}`)}
            </Avatar>
            <Typography>
              {params.row.first_name} {params.row.last_name}
            </Typography>
          </>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        width: 140,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        width: 150,
      },
      {
        field: "role",
        headerName: "Role",
        width: 120,
      },
      {
        field: "date_joined",
        headerName: "Date Joined",
        width: 150,
        valueGetter: (params) => new Date(params.row.date_joined).toDateString(),
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<TrashIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<ShieldCheckIcon />}
            label="Toggle Admin"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin]
  );

  return (
    <Card>
      <Box sx={{ height: 110 + rowsPerPage * 52 + "px", mx: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: rowsPerPage,
              },
            },
          }}
          pageSizeOptions={[rowsPerPage]}
          disableRowSelectionOnClick
          onRowClick={(event) => handleMemberClick(event.row)}
        />
      </Box>
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
