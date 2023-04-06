import Head from "next/head";
import { Box, Container, Stack, Typography, CardMedia, Button } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

const dateFormat = (date) => {
  const d = new Date(date);
  return d.toDateString();
};

const Page = () => {
  const router = useRouter();
  const isAdmin = useAuth().user?.role === "admin";

  const [data, setData] = useState({});
  const newsID = router.query.id;

  const getNews = async (id) => {
    await apiClient.get(`/news/${id}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    if (newsID) getNews(newsID);
  }, [newsID]);

  const redirectToEdit = () => {
    if (newsID) router.push(`/news/edit/${newsID}`);
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 10,
        }}
      >
        <Container maxWidth="md">
          {isAdmin && (
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={
                  <PencilIcon
                    style={{
                      width: 20,
                    }}
                  />
                }
                onClick={redirectToEdit}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={
                  <TrashIcon
                    style={{
                      width: 20,
                    }}
                  />
                }
                onClick={() => {
                  console.log("Delete");
                  router.push("/news");
                }}
              >
                Delete
              </Button>
            </Stack>
          )}
          <Stack mt={2} spacing={2}>
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="subtitle2">
              {dateFormat(data.created_at)} | {data.creator}
            </Typography>
            <CardMedia
              component="img"
              image={data.image}
              alt="Event Image"
              sx={{
                borderRadius: 2,
              }}
            />
            <Typography textAlign="justify" variant="text">
              {data.content}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
