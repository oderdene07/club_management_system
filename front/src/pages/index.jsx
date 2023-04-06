import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { OverviewEvents } from "@/components/overview/overview-events";
import { OverviewTotalMembers } from "@/components/overview/overview-total-members";
import { OverviewEventsList } from "@/components/overview/overview-events-list";
import { OverviewNewsList } from "@/components/overview/overview-news-list";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);

  const getEvents = async () => {
    await apiClient.get("/events").then((res) => {
      setEvents(res.data);
    });
  };

  const getNews = async () => {
    await apiClient.get("/news").then((res) => {
      setNews(res.data);
    });
  };

  const getUpcomingEventsCount = async () => {
    await apiClient.get("/events/count").then((res) => {
      setEventsCount(res.data);
    });
  };

  const getMembersCount = async () => {
    await apiClient.get("/members/count").then((res) => {
      setMembersCount(res.data);
    });
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
