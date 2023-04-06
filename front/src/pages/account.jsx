import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/overview/layout";
import { AccountProfile } from "@/components/account/account-profile";
import { AccountProfileDetails } from "@/components/account/account-profile-details";
import { AccountPassword } from "@/components/account/account-password";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

const Page = () => {
  const { user } = useAuth();
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    occupation: "",
    profile_picture: "",
    profile_description: "",
  });

  useEffect(() => {
    setMember({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_number: user?.phone_number,
      occupation: user?.occupation,
      profile_picture: user?.profile_picture,
      profile_description: user?.profile_description,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiClient.put("/member/" + user?.id, member).then((res) => {
      console.log(res);
    });
    console.log(member);
  };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Account</Typography>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={5}>
                  <Grid xs={12}>
                    <AccountProfile member={member} setMember={setMember} />
                  </Grid>
                  <Grid xs={12}>
                    <AccountPassword member={member} />
                  </Grid>
                </Grid>
                <Grid xs={12} md={6} lg={7}>
                  <AccountProfileDetails
                    member={member}
                    setMember={setMember}
                    handleSubmit={handleSubmit}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
