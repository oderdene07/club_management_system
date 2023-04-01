import { CameraIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
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
  Tooltip,
} from "@mui/material";
import { useCallback, useState } from "react";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import { useAuth } from "@/contexts/auth-context";

export const EventModal = (props) => {
  const { selectedEvent, isModalVisible, handleCloseModal } = props;

  const isAdmin = useAuth().user?.role === "admin";

  const [values, setValues] = useState(
    selectedEvent
      ? {
          title: selectedEvent.title,
          description: selectedEvent.description,
          location: selectedEvent.location,
          startDate: new Date(selectedEvent.start_date),
          endDate: new Date(selectedEvent.end_date),
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

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
      // add event to events list

      console.log("submit", values);
      handleCloseModal();
    },
    [values, handleCloseModal]
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
              <Stack alignItems="center">
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
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              {...(isAdmin ? {} : { focused: false })}
              InputProps={{
                readOnly: !isAdmin,
              }}
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
              {...(isAdmin ? {} : { focused: false })}
              InputProps={{
                readOnly: !isAdmin,
              }}
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
                {...(isAdmin ? {} : { focused: false })}
                InputProps={{
                  readOnly: !isAdmin,
                }}
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
                readOnly={!isAdmin}
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

        {isAdmin && (
          <CardActions sx={{ pt: 2, justifyContent: "flex-end" }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  handleCloseModal();
                  setValues({
                    title: "",
                    description: "",
                    location: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    image: "",
                  });
                }}
                variant="outlined"
              >
                Close
              </Button>
              <Button onClick={handleSubmit} variant="contained">
                Save details
              </Button>
            </Stack>
          </CardActions>
        )}
      </Card>
    </Modal>
  );
};
