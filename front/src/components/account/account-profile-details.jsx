import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const user = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  phone_number: "99887744",
  occupation: "Software Engineer",
  date_joined: "2023-03-20T00:00:00Z",
  profile_picture: "/assets/avatars/avatar-anika-visser.png",
  profile_description: "I am a software engineer",
};

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    occupation: user.occupation,
    profile_description: user.profile_description,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", values);
    },
    [values]
  );

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  type="number"
                  value={values.phone_number}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  onChange={handleChange}
                  value={values.occupation}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  multiline
                  maxRows={4}
                  fullWidth
                  label="Description"
                  name="profile_description"
                  onChange={handleChange}
                  value={values.profile_description}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider sx={{ borderColor: "primary.light" }} />
        <CardActions sx={{ py: 2, px: 3, justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit} variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
