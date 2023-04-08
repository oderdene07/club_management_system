import { apiClient } from "@/api/apiClient";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";

export const AccountPassword = ({ member }) => {
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const changePasswordData = {
    email: member.email,
    password: values.password,
  };

  const handleChange = useCallback((event) => {
    setError(false);
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async () => {
    if (values.password !== values.confirm) {
      setError(true);
      return;
    }
    await apiClient.post(`/member/password`, changePasswordData);
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              autoComplete="off"
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              autoComplete="off"
              label="Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              error={error}
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ padding: 3, paddingTop: 1, justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit} variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
