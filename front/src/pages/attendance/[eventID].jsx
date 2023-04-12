import { apiClient } from "@/api/apiClient";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const rowsPerPage = 12;

const dateFormatter = (startDate, endDate) => {
  // may, 15 12:00 AM - may, 15 12:00 AM
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
  const [event, setEvent] = useState({});

  const getEventAttendance = async (id) => {
    const response = await apiClient.get(`/event/${id}/attendance`);
    console.log(response.data);
    setAttendance(response.data);
  };

  const getEventByID = async (id) => {
    const response = await apiClient.get(`/event/${id}`);
    setEvent(response.data);
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
            <Typography fontSize="1.2rem" variant="overline">
              Event: <i>{event?.title}</i>
            </Typography>
            <Typography fontSize="1.2rem" variant="caption">
              Date: <i>{dateFormatter(event?.start_date, event?.end_date)}</i>
            </Typography>
          </Stack>
          <Card>
            <DataGrid
              autoHeight
              checkboxSelection
              disableRowSelectionOnClick
              rows={attendance}
              columns={columns}
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
