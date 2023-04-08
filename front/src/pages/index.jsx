import { apiClient } from "@/api/apiClient";
import { OverviewEvents } from "@/components/overview/overview-events";
import { OverviewEventsList } from "@/components/overview/overview-events-list";
import { OverviewNewsList } from "@/components/overview/overview-news-list";
import { OverviewTotalMembers } from "@/components/overview/overview-total-members";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);

  const getEvents = async () => {
    const res = await apiClient.get("/events");
    setEvents(res.data);
  };

  const getNews = async () => {
    const res = await apiClient.get("/news");
    setNews(res.data);
  };

  const getUpcomingEventsCount = async () => {
    const res = await apiClient.get("/events/count");
    setEventsCount(res.data);
  };

  const getMembersCount = async () => {
    const res = await apiClient.get("/members/count");
    setMembersCount(res.data);
  };

  useEffect(() => {
    getEvents();
    getNews();
    getUpcomingEventsCount();
    getMembersCount();
  }, []);

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
              <OverviewEvents value={eventsCount + ""} />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <OverviewTotalMembers value={membersCount + ""} />
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
