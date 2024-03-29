import { apiClient } from "@/api/apiClient";
import { EventModal } from "@/components/events/event-modal";
import { EventCard } from "@/components/events/events-card";
import { EventsSearch } from "@/components/events/events-search";
import usePagination from "@/components/pagination";
import { useAuth } from "@/contexts/auth-context";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { TabContext } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

const rowsPerPage = 8;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function tabEvents(data, tab) {
  if (tab === 0) {
    return data.filter((event) => new Date(event.start_date) > new Date());
  }
  if (tab === 1) {
    return data.filter((event) => new Date(event.start_date) < new Date());
  }
}

function TabPanel(props) {
  const { children, tab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tab === index && <Box py={3}>{children}</Box>}
    </div>
  );
}

const Page = () => {
  const isAdmin = useAuth().user?.role === "admin";

  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getEvents = async () => {
    const response = await apiClient.get("/events");
    setData(response.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const currentTabEvents = tabEvents(data, tab);
  const count = Math.ceil(currentTabEvents.length / rowsPerPage);
  const events = usePagination(currentTabEvents, rowsPerPage);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    events.jump(newPage);
  };

  const handleSearch = (value) => {
    if (!value) {
      getEvents();
      return;
    }
    const filteredData = data.filter((event) =>
      event.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Events</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              {isAdmin && (
                <>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={() => setIsModalVisible(true)}
                  >
                    Add
                  </Button>
                  <EventModal
                    isModalVisible={isModalVisible}
                    handleCloseModal={() => setIsModalVisible(false)}
                    refresh={getEvents}
                  />
                </>
              )}
              <EventsSearch
                onChange={(value) => {
                  handleSearch(value);
                }}
              />
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab label="Upcoming" {...a11yProps(0)} />
              <Tab label="Recent" {...a11yProps(1)} />
            </Tabs>
          </Stack>
          {[0, 1].map((t) => (
            <TabPanel key={t} tab={tab} index={t}>
              <Grid container spacing={3} paddingX={0}>
                {events.currentData().length === 0 ? (
                  <Grid xs={12}>
                    <Box mt={3} textAlign="center">
                      <img
                        alt="Empty"
                        src="/assets/errors/error-404.png"
                        style={{
                          width: 200,
                        }}
                      />
                      <Typography mt={2} variant="overline" component="p">
                        No events found
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  events.currentData().map((event) => (
                    <Grid xs={12} sm={6} md={6} lg={4} xl={3} key={event.id}>
                      <EventCard event={event} refresh={getEvents} />
                    </Grid>
                  ))
                )}
              </Grid>
            </TabPanel>
          ))}
        </Container>
      </Box>
      <Pagination size="small" count={count} page={page} onChange={handleChangePage} />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <TabContext value="1">{page}</TabContext>
  </DashboardLayout>
);

export default Page;
