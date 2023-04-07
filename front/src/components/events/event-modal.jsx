import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/contexts/auth-context";
import { CameraIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import { useCallback, useEffect, useState } from "react";

export const EventModal = ({ selectedEvent, isModalVisible, handleCloseModal, refresh }) => {
  const isAdmin = useAuth().user?.role === "admin";

  const [values, setValues] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedEvent)
      setValues({
        title: selectedEvent.title,
        description: selectedEvent.description,
        location: selectedEvent.location,
        start_date: new Date(selectedEvent.start_date),
        end_date: new Date(selectedEvent.end_date),
        image: selectedEvent.image,
      });
    else
      setValues({
        title: "",
        description: "",
        location: "",
        start_date: null,
        end_date: null,
        image: "",
      });
  }, [selectedEvent]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setValues((prevState) => ({
      ...prevState,
      image: res.data,
    }));
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

  const addEvent = async (event) => {
    try {
      await apiClient.post("/event", event);
      await refresh();
    } catch (err) {
      console.error("Error submitting form: ", err);
    }
  };

  const removeEvent = async (id) => {
    try {
      await apiClient.delete("/event/" + id);
      await refresh();
    } catch (err) {
      console.error("Error deleting event: ", err);
    }
  };

  const updateEvent = async (event) => {
    try {
      await apiClient.put("/event/" + event.id, event);
      await refresh();
    } catch (err) {
      console.error("Error updating event: ", err);
    }
  };

  const handleSubmit = async () => {
    if (values.title === "") {
      setError("Title is required");
      return;
    }
    if (selectedEvent)
      updateEvent({
        id: selectedEvent.id,
        title: values.title,
        description: values.description,
        location: values.location,
        start_date: values.start_date,
        end_date: values.end_date,
        image: values.image,
      });
    else addEvent(values);
    handleCloseModal();
    setValues({
      title: "",
      description: "",
      location: "",
      start_date: new Date(),
      end_date: new Date(),
      image: "",
    });
  };

  const handleDelete = async () => {
    if (selectedEvent === null) return;
    removeEvent(selectedEvent.id);
    handleCloseModal();
  };

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
          },
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 350,
          maxWidth: 550,
        }}
      >
        {isAdmin && (
          <CardHeader
            title={selectedEvent ? "Edit Event" : "Create Event"}
            action={
              selectedEvent && (
                <Button onClick={handleDelete} color="error">
                  Delete
                </Button>
              )
            }
            sx={{
              padding: 0,
              paddingBottom: 2,
            }}
          />
        )}
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
                      image={process.env.NEXT_PUBLIC_API_URL + values.image}
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
              error={error === "Title is required"}
              required
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
            {error === "Title is required" && <Typography color="error.main">{error}</Typography>}
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
                value={[values.start_date, values.end_date]}
                format="dd/MM/yyyy HH:mm"
                onChange={(newValue) => {
                  setValues((prevState) => ({
                    ...prevState,
                    start_date: newValue[0],
                    end_date: newValue[1],
                  }));
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, borderColor: "primary.light" }} />

        {isAdmin && (
          <CardActions sx={{ p: 0, pt: 2, justifyContent: "flex-end" }}>
            <Stack direction="row" spacing={2}>
              <Button onClick={handleCloseModal} variant="outlined">
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
