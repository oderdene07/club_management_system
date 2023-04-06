import { useCallback } from "react";
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

export const AccountProfileDetails = ({ member, setMember, handleSubmit }) => {
  const handleChange = useCallback(
    (event) => {
      setMember((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setMember]
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
                  value={member.first_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={member.last_name}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={member.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  type="number"
                  value={member.phone_number}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  onChange={handleChange}
                  value={member.occupation}
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
                  value={member.profile_description}
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
