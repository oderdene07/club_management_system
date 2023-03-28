import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { EventCard } from "@/components/events/events-card";
import { EventsSearch } from "@/components/events/events-search";
import { TabContext } from "@mui/lab";
import { useState } from "react";
import usePagination from "@/components/pagination";
import { EventModal } from "@/components/events/event-modal";
import { useAuth } from "@/contexts/auth-context";

const data = [
  {
    id: "1",
    title: "Tech MeetUp Vol 1",
    location: "New York, USA",
    startDate: "2021-09-24 10:00:00",
    endDate: "2021-09-24 11:00:00",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    image: "/assets/products/product-1.png",
  },
  {
    id: "2",
    title: "Tech MeetUp Vol 6",
    location: "San Francisco, USA",
    startDate: "2021-09-24 10:00:00",
    endDate: "2021-09-24 11:00:00",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    image: "/assets/products/product-2.png",
  },
  {
    id: "3",
    title: "Tech MeetUp Vol 7",
    location: "San Francisco, USA",
    startDate: "2021-09-24 10:00:00",
    endDate: "2021-09-24 11:00:00",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    image: "/assets/products/product-6.png",
  },
  {
    id: "4",
    title: "Tech MeetUp Vol 8",
    location: "San Francisco, USA",
    startDate: "2021-09-24 10:00:00",
    endDate: "2021-09-24 11:00:00",
    description: "Lyft is an on-demand transportation event based in San Francisco, California.",
    image: "/assets/products/product-4.png",
  },
  {
    id: "5",
    title: "Tech MeetUp Vol 9",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    image: "/assets/products/product-5.png",
  },
  {
    id: "7",
    title: "Tech MeetUp Vol 1",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "Lyft is an on-demand transportation event based in San Francisco, California.",
    image: "/assets/products/product-4.png",
  },
  {
    id: "8",
    title: "Tech MeetUp Vol 2",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    image: "/assets/products/product-5.png",
  },
  {
    id: "9",
    title: "Tech MeetUp Vol 3",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    image: "/assets/products/product-6.png",
  },
  {
    id: "10",
    title: "Tech MeetUp Vol 4",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "Lyft is an on-demand transportation event based in San Francisco, California.",
    image: "/assets/products/product-4.png",
  },
  {
    id: "11",
    title: "Tech MeetUp Vol 5",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    image: "/assets/products/product-5.png",
  },
  {
    id: "12",
    title: "Tech MeetUp Vol 6",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    image: "/assets/products/product-6.png",
  },
  {
    id: "13",
    title: "Tech MeetUp Vol 8",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "Lyft is an on-demand transportation event based in San Francisco, California.",
    image: "/assets/products/product-4.png",
  },
  {
    id: "14",
    title: "Tech MeetUp Vol 9",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    image: "/assets/products/product-5.png",
  },
  {
    id: "15",
    title: "Tech MeetUp Vol 10",
    location: "San Francisco, USA",
    startDate: "2024-09-24 10:00:00",
    endDate: "2024-09-24 11:00:00",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    image: "/assets/products/product-6.png",
  },
];

const rowsPerPage = 8;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function tabEvents(data, tab) {
  if (tab === 0) {
    return data.filter((event) => new Date(event.startDate) > new Date());
  }
  if (tab === 1) {
    return data.filter((event) => new Date(event.startDate) < new Date());
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

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);

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
                  />
                </>
              )}
              <EventsSearch />
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
                {events.currentData().map((event) => (
                  <Grid xs={12} sm={6} md={6} lg={4} xl={3} key={event.id}>
                    <EventCard event={event} />
                  </Grid>
                ))}
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
