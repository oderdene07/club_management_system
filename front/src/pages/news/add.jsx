import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Button,
  CardActions,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { NewsForm } from "@/components/news/news-form";
import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/auth-context";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    member_id: user?.id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    await apiClient.post("/news", values).then((res) => {
      console.log(res);
      router.push("/news");
    });
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setValues]
  );

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      if (file) reader.readAsDataURL(file);
    },
    [setValues]
  );

  return (
    <>
      <Head>
        <title>Add News</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <form autoComplete="off">
            <Card>
              <CardHeader title="Add News" />
              <CardContent>
                <NewsForm
                  values={values}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                />
              </CardContent>
              <Divider sx={{ borderColor: "primary.light" }} />
              <CardActions sx={{ padding: 3, justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => router.push("/news")} variant="outlined">
                    Close
                  </Button>
                  <Button onClick={handleSubmit} variant="contained">
                    Save details
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </form>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
