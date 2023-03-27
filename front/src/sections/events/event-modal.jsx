import { ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useCallback, useState } from "react";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";

export const EventModal = (props) => {
  const { selectedEvent, isModalVisible, handleCloseModal } = props;

  const [values, setValues] = useState(
    selectedEvent
      ? {
          title: selectedEvent.title,
          description: selectedEvent.description,
          location: selectedEvent.location,
          startDate: new Date(selectedEvent.startDate),
          endDate: new Date(selectedEvent.endDate),
          image: selectedEvent.image,
        }
      : {
          title: "",
          description: "",

          location: "",
          startDate: new Date(),
          endDate: new Date(),
          image: "",
        }
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", values);
    },
    [values]
  );

  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={isModalVisible}
      onClose={handleCloseModal}
    >
      <Card
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 400,
          maxWidth: 600,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {values.image ? (
              <CardMedia component="img" height={250} image={values.image} alt="Event Image" />
            ) : (
              // input image source

              <CardMedia
                component="img"
                height={250}
                image="https://source.unsplash.com/random"
                alt="Event Image"
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              maxRows={4}
              fullWidth
              label="Description"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" alignItems="center">
              <IconButton
                color="warning"
                disableRipple
                sx={{
                  bgcolor: "warning.light",
                  marginRight: 2,
                  cursor: "default",
                  "&:hover": {
                    bgcolor: "warning.light",
                  },
                }}
              >
                <MapPinIcon
                  style={{
                    width: 28,
                    height: 28,
                    color: "warning.main",
                  }}
                />
              </IconButton>
              <TextField
                fullWidth
                label="Location"
                name="location"
                onChange={handleChange}
                value={values.location}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <IconButton
                color="warning"
                disableRipple
                sx={{
                  bgcolor: "warning.light",
                  marginRight: 2,
                  cursor: "default",
                  "&:hover": {
                    bgcolor: "warning.light",
                  },
                }}
              >
                <ClockIcon
                  style={{
                    width: 28,
                    height: 28,
                    color: "warning.main",
                  }}
                />
              </IconButton>
              <MultiInputDateTimeRangeField
                slotProps={{
                  textField: ({ position }) => ({
                    label: position === "start" ? "Check-in" : "Check-out",
                  }),
                }}
                value={[values.startDate, values.endDate]}
                onChange={(newValue) => {
                  setValues((prevState) => ({
                    ...prevState,
                    startDate: newValue[0],
                    endDate: newValue[1],
                  }));
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, borderColor: "primary.light" }} />

        <CardActions sx={{ pt: 2, justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleCloseModal} variant="outlined">
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Save details
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  );
};
