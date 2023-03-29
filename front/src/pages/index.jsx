import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { OverviewEvents } from "@/components/overview/overview-events";
import { OverviewTotalMembers } from "@/components/overview/overview-total-members";
import { OverviewEventsList } from "@/components/overview/overview-events-list";
import { OverviewNewsList } from "@/components/overview/overview-news-list";
import { useApi } from "@/hooks/use-api";

const Page = () => {
  const events = useApi("/events");
  const news = useApi("/news");
  const eventsData = events.data;
  const newsData = news.data;

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
              <OverviewEventsList events={eventsData} />
            </Grid>
            <Grid xs={12}>
              <OverviewNewsList news={newsData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
