import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/auth-context";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { getInitials } from "@/utils/get-initials";
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const rowsPerPage = 12;

const dateFormatter = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  const startString = start.toLocaleDateString("en-US", options);
  const endString = end.toLocaleDateString("en-US", options);
  return `${startString} - ${endString}`;
};

const Page = () => {
  const isAdmin = useAuth().user?.role === "admin";
  const router = useRouter();
  const eventID = router.query.eventID;
  const [attendance, setAttendance] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [event, setEvent] = useState({});

  const getEventAttendance = async (id) => {
    const attendanceData = await apiClient.get(`/event/${id}/attendance`);
    const membersData = await apiClient.get("/members");

    const attendance = membersData?.data?.map((member) => {
      const attendanceRow = attendanceData?.data?.find(
        (attendanceRow) => attendanceRow.member.id === member.id
      );
      return {
        id: member?.id,
        member: member,
        status: attendanceRow?.status ? attendanceRow?.status : "not responded",
        attended: attendanceRow?.attended ? attendanceRow?.attended : false,
      };
    });

    attendance.sort((a, b) => {
      const nameA = a.member.first_name.toUpperCase();
      const nameB = b.member.first_name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setAttendance(attendance);
  };

  const getEventByID = async (id) => {
    const response = await apiClient.get(`/event/${id}`);
    setEvent(response.data);
  };

  const handleUpdateAttendance = async () => {
    const data = selectedRows.map((id) => {
      const {
        id: rowId,
        member: { id: memberID },
        status,
        attended,
      } = attendance.find((row) => row.id === id);
      return {
        id: rowId,
        event_id: parseInt(eventID),
        member_id: memberID,
        status,
        attended: !attended,
      };
    });

    await apiClient.put(`/event/${eventID}/attendance`, data);
    await refresh();
    setSelectedRows([]);
  };

  const refresh = async () => {
    await getEventAttendance(eventID);
    await getEventByID(eventID);
  };

  useEffect(() => {
    if (eventID) {
      getEventAttendance(eventID);
      getEventByID(eventID);
    }
  }, [eventID]);

  const columns = [
    {
      field: "Avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={
            params.row.member.profile_picture &&
            process.env.NEXT_PUBLIC_API_URL + params.row.member.profile_picture
          }
          sx={{ width: 36, height: 36, fontSize: 16, mr: 2 }}
        >
          {getInitials(`${params.row.member.first_name} ${params.row.member.last_name}`)}
        </Avatar>
      ),
    },
    {
      field: "full_name",
      headerName: "Full name",
      flex: 1,
      renderCell: (params) => (
        <Typography fontSize={16} variant="caption">
          {params.row.member.first_name} {params.row.member.last_name}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          fontSize={14}
          variant="overline"
          color={
            params.row.status === "maybe"
              ? "warning.main"
              : params.row.status === "going"
              ? "success.main"
              : params.row.status === "not going"
              ? "error.main"
              : "text.card"
          }
        >
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: "attended",
      headerName: "Attended",
      flex: 1,
      type: "boolean",
      renderCell: (params) => (
        <Typography variant="overline" color={params.row.attended ? "primary.main" : "text.card"}>
          <Stack>
            {params.row.attended ? <CheckCircleIcon width={28} /> : <XCircleIcon width={28} />}
          </Stack>
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Attendance</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth="xl">
          <Stack mb={4} spacing={2} alignItems="flex-start">
            <Typography variant="h5">Attendance Table</Typography>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Typography fontSize="1.2rem" variant="overline">
                  Event: <i>{event?.title}</i>
                </Typography>
                <Typography fontSize="1.2rem" variant="caption" color="neutral.600">
                  Date: <i>{dateFormatter(event?.start_date, event?.end_date)}</i>
                </Typography>
              </Stack>
              {isAdmin && (
                <Button
                  disabled={selectedRows?.length === 0}
                  variant="contained"
                  startIcon={<ArrowPathIcon width={24} />}
                  onClick={handleUpdateAttendance}
                >
                  Update Attendace
                </Button>
              )}
            </Stack>
          </Stack>
          <Card>
            <DataGrid
              autoHeight
              checkboxSelection={isAdmin}
              rows={attendance}
              columns={columns}
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: rowsPerPage,
                  },
                },
              }}
              pageSizeOptions={[rowsPerPage]}
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
                  bgcolor: "action.hover",
                },
              }}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
