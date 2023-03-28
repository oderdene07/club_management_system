import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  CardMedia,
  Button,
  TextField,
  CardActions,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tooltip,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/overview/layout";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    creator: "",
  });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", values);
      router.push("/news");
    },
    [values, router]
  );

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
                <Stack spacing={2}>
                  <TextField
                    required
                    label="Title"
                    name="title"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                  />
                  <Box>
                    {values.image ? (
                      <Stack alignItems="flex-start">
                        <Tooltip title="Click to change image">
                          <Button
                            variant="outlined"
                            component="label"
                            sx={{
                              padding: 0,
                              overflow: "hidden",
                              "&:hover": {
                                opacity: 0.8,
                              },
                            }}
                          >
                            <CardMedia
                              component="img"
                              height={250}
                              image={values.image}
                              alt="Event Image"
                            />
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleImageChange}
                            />
                          </Button>
                        </Tooltip>
                      </Stack>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={
                          <CameraIcon
                            style={{
                              width: 28,
                              height: 28,
                            }}
                          />
                        }
                      >
                        Upload Image ...
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                      </Button>
                    )}
                  </Box>
                  <TextField
                    label="Content"
                    name="content"
                    fullWidth
                    multiline
                    rows={10}
                    value={values.content}
                    onChange={handleChange}
                  />
                </Stack>
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
