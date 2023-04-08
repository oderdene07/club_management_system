import { apiClient } from "@/api/apiClient";
import { MembersSearch } from "@/components/member/members-search";
import { MembersTable } from "@/components/member/members-table";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMembers = async () => {
    setLoading(true);
    const res = await apiClient.get("/members");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleSearch = (value) => {
    console.log(value);
  };

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
                <MembersSearch onChange={(value) => handleSearch(value)} />
              </Stack>
            </Stack>
            <MembersTable members={data} loading={loading} refresh={getMembers} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
