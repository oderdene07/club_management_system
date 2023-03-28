import { useCallback } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export const SettingsForm = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Manage the web contents" title="Web Content" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center">
              <Typography minWidth={100} variant="subtitle1">
                Organizer
              </Typography>
              <TextField fullWidth label="Organizer" name="organizer" />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography minWidth={100} variant="subtitle1">
                Logo
              </Typography>
              <TextField fullWidth label="Logo" name="logo" />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography minWidth={100} variant="subtitle1">
                Header
              </Typography>
              <TextField fullWidth label="Header" name="header" />
            </Stack>
            <Stack direction="row" alignItems="flex-start">
              <Typography mt={1.8} minWidth={100} variant="subtitle1">
                Text
              </Typography>
              <TextField fullWidth label="Text" name="text" multiline rows={10} />
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ padding: 3, justifyContent: "flex-end" }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
};
