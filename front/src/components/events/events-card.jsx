import PropTypes from "prop-types";
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { EventModal } from "./event-modal";
import { useState } from "react";

const dateFormatted = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleString("en-GB", {
    month: "short",
  })} ${start.getDate()} ${start.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })} - ${end.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })}`;
};

export const EventCard = (props) => {
  const { event } = props;

  const [selectedEvent, setSelectedEvent] = useState(event);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          color: "neutral.400",
          minWidth: 270,
          cursor: "pointer",
        }}
        onClick={() => handleEventClick(event)}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            padding: "1rem 1rem 0 1rem",
            height: 200,
          }}
        >
          <CardMedia
            sx={{
              borderRadius: 1,
            }}
            component="img"
            image={event.image}
          />
        </Box>
        <CardContent>
          <Typography mb="1rem" mt="0.5rem" color="neutral.500" gutterBottom variant="h6">
            {event.title}
          </Typography>
          <Stack alignItems="flex-start" direction="column" justifyContent="center" spacing={1.5}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <SvgIcon fontSize="small">
                <MapPinIcon />
              </SvgIcon>
              <Typography display="inline" variant="body2">
                {event.location}
              </Typography>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <SvgIcon fontSize="small">
                <CalendarIcon />
              </SvgIcon>
              <Typography display="inline" variant="body2">
                {dateFormatted(event.startDate, event.endDate)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <EventModal
        selectedEvent={selectedEvent}
        isModalVisible={isModalVisible}
        handleCloseModal={() => setIsModalVisible(false)}
      />
    </>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
