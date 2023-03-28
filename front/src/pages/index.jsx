import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { OverviewEvents } from "@/components/overview/overview-events";
import { OverviewTotalMembers } from "@/components/overview/overview-total-members";
import { OverviewEventsList } from "@/components/overview/overview-events-list";
import { OverviewNewsList } from "@/components/overview/overview-news-list";

const eventsData = [
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
const newsData = [
  {
    id: "1",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-1.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "2",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-2.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "3",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "4",
    title: "Netbook Network Added New Photo Filter",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-4.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "5",
    title: "We Optimised Netbooks Better Navigation",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-5.png",
    createdAt: "2021-09-24 10:00:00",
  },
  {
    id: "6",
    title: "It Does Not Matter Hows Slowly go as Long",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/products/product-6.png",
    createdAt: "2021-09-24 10:00:00",
  },
];

const Page = () => {
  const events = eventsData.slice(0, 7);
  const news = newsData.slice(0, 5);

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={4}>
              <OverviewEvents value="9" />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <OverviewTotalMembers value="32" />
            </Grid>
            <Grid xs={12}>
              <OverviewEventsList events={events} />
            </Grid>
            <Grid xs={12}>
              <OverviewNewsList news={news} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
