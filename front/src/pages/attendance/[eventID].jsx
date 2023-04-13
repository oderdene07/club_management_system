import { apiClient } from "@/api/apiClient";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
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
  const router = useRouter();
  const eventID = router.query.eventID;
  const [attendance, setAttendance] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [event, setEvent] = useState({});

  const getEventAttendance = async (id) => {
    const response = await apiClient.get(`/event/${id}/attendance`);
    response.data.sort((a, b) => {
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

    setAttendance(response.data);
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
      return { id: rowId, eventID, memberID, status, attended: !attended };
    });

    console.log(data);

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
      field: "first_name",
      headerName: "First name",
      flex: 1,
      valueGetter: (params) => params.row.member.first_name,
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
      valueGetter: (params) => params.row.member.last_name,
    },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "attended", headerName: "Attended", flex: 1, type: "boolean" },
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
                <Typography fontSize="1.2rem" variant="caption">
                  Date: <i>{dateFormatter(event?.start_date, event?.end_date)}</i>
                </Typography>
              </Stack>
              <Button
                disabled={selectedRows?.length === 0}
                variant="contained"
                startIcon={<ArrowPathIcon width={24} />}
                onClick={handleUpdateAttendance}
              >
                Update Attendace
              </Button>
            </Stack>
          </Stack>
          <Card>
            <DataGrid
              autoHeight
              checkboxSelection
              disableRowSelectionOnClick
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
                  bgcolor: "primary.light",
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
