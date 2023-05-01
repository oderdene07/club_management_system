import { apiClient } from "@/api/apiClient";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

export const AccountPassword = ({ member }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await apiClient.post(`/member/password`, changePasswordData);
      setValues({
        password: "",
        confirm: "",
      });
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            {error && errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
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
        <CardActions
          sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 2, justifyContent: "flex-end" }}
        >
          <Button
            disabled={values.confirm.length === 0}
            startIcon={<PencilSquareIcon width={20} />}
            onClick={handleSubmit}
            variant="contained"
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
