import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/overview/layout";
import { MembersTable } from "src/sections/member/members-table";
import { MembersSearch } from "src/sections/member/members-search";

const data = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    phone_number: "555-1234",
    occupation: "Engineer",
    role: "member",
    date_joined: "2022-01-01T00:00:00Z",
    profile_picture: "/assets/avatars/avatar-alcides-antonio.png",
    profile_description: "I am a software engineer.",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "janesmith@example.com",
    phone_number: "555-5678",
    occupation: "Designer",
    role: "organizer",
    date_joined: "2022-01-15T00:00:00Z",
    profile_picture: "",
    profile_description: "I am a graphic designer.",
  },
  {
    id: 3,
    first_name: "Bob",
    last_name: "Johnson",
    email: "bobjohnson@example.com",
    phone_number: "555-2468",
    occupation: "Developer",
    role: "superuser",
    date_joined: "2022-02-01T00:00:00Z",
    profile_picture: "",
    profile_description: "I am a full-stack developer.",
  },
  {
    id: 19,
    first_name: "odko",
    last_name: "test",
    email: "oderdene@test.com",
    phone_number: "",
    occupation: "",
    role: "unverified",
    date_joined: "2023-03-17T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 20,
    first_name: "odko",
    last_name: "test",
    email: "admin@test.com",
    phone_number: "",
    occupation: "",
    role: "unverified",
    date_joined: "2023-03-17T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 21,
    first_name: "odko",
    last_name: "test",
    email: "oderdene.dev@test.com",
    phone_number: "",
    occupation: "",
    role: "unverified",
    date_joined: "2023-03-17T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 22,
    first_name: "odko",
    last_name: "test",
    email: "oderdene.dev@gmail.com",
    phone_number: "",
    occupation: "",
    role: "member",
    date_joined: "2023-03-17T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 23,
    first_name: "Test",
    last_name: "User",
    email: "oderdene@gmail.com",
    phone_number: "08123456789",
    occupation: "Software Engineer",
    role: "admin",
    date_joined: "2019-01-01T00:00:00Z",
    profile_picture: "",
    profile_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 24,
    first_name: "user",
    last_name: "admin",
    email: "oderdene07@gmail.com",
    phone_number: "",
    occupation: "",
    role: "request",
    date_joined: "2023-03-20T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 25,
    first_name: "Test",
    last_name: "User",
    email: "oderdene@gmail.com",
    phone_number: "08123456789",
    occupation: "Software Engineer",
    role: "admin",
    date_joined: "2019-01-01T00:00:00Z",
    profile_picture: "",
    profile_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 26,
    first_name: "Test",
    last_name: "User",
    email: "oderdene@gmail.com",
    phone_number: "08123456789",
    occupation: "Software Engineer",
    role: "admin",
    date_joined: "2019-01-01T00:00:00Z",
    profile_picture: "",
    profile_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 27,
    first_name: "user",
    last_name: "admin",
    email: "oderdene07@gmail.com",
    phone_number: "",
    occupation: "",
    role: "request",
    date_joined: "2023-03-20T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 28,
    first_name: "Test",
    last_name: "User",
    email: "oderdene@gmail.com",
    phone_number: "08123456789",
    occupation: "Software Engineer",
    role: "admin",
    date_joined: "2019-01-01T00:00:00Z",
    profile_picture: "",
    profile_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 29,
    first_name: "user",
    last_name: "admin",
    email: "oderdene07@gmail.com",
    phone_number: "",
    occupation: "",
    role: "request",
    date_joined: "2023-03-20T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
  {
    id: 30,
    first_name: "user",
    last_name: "admin",
    email: "oderdene07@gmail.com",
    phone_number: "",
    occupation: "",
    role: "request",
    date_joined: "2023-03-20T00:00:00Z",
    profile_picture: "",
    profile_description: "",
  },
];

const Page = () => {
  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Stack spacing={1}>
                <Typography variant="h4">Members</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <MembersSearch />
              </Stack>
            </Stack>
            <MembersTable members={data} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
