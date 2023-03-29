import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { NewsCard } from "@/components/news/news-card";
import { useRouter } from "next/router";
import { useState } from "react";
import usePagination from "@/components/pagination";
import { useAuth } from "@/contexts/auth-context";
import { useApi } from "@/hooks/use-api";

const rowsPerPage = 8;

const Page = () => {
  const router = useRouter();
  const { data, error, loading } = useApi("/news");

  const [page, setPage] = useState(1);
  const isAdmin = useAuth().user?.role === "admin";

  const count = Math.ceil(data.length / rowsPerPage);
  const news = usePagination(data, rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    news.jump(newPage);
  };

  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">News</Typography>
              </Stack>

              {isAdmin && (
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => {
                    router.push("/news/add");
                  }}
                >
                  Add
                </Button>
              )}
            </Stack>
            <Grid container spacing={2}>
              {news.currentData().map((newsItem) => (
                <Grid xs={12} sm={6} md={4} lg={4} xl={3} key={newsItem.id}>
                  <NewsCard newsItem={newsItem} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
      <Pagination size="small" count={count} page={page} onChange={handleChangePage} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
