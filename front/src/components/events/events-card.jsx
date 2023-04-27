import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { EventModal } from "./event-modal";

const dateFormatted = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleString("en-GB", {
    month: "short",
  })} ${start.getDate()} ${start.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })} - ${end.toLocaleString("en-GB", {
    month: "short",
  })} ${end.getDate()} ${end.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })}`;
};

export const EventCard = ({ event, refresh }) => {
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  return (
    <ButtonBase
      sx={{
        borderRadius: 2,
        margin: 0,
        padding: 0,
        transition: "transform .3s ease-in-out",
        ":hover": {
          transform: "scale(1.04)",
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          color: "text.card",
          minWidth: 270,
          bgcolor: "background.common",
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
          {event.image ? (
            <CardMedia
              sx={{
                borderRadius: 1,
              }}
              component="img"
              image={process.env.NEXT_PUBLIC_API_URL + event.image}
            />
          ) : (
            <CardMedia
              sx={{
                borderRadius: 1,
                backgroundColor: "text.card",
              }}
              component="img"
              image="https://picsum.photos/300/200"
            />
          )}
        </Box>
        <CardContent>
          <Typography
            textAlign="left"
            mb="1rem"
            mt="0.5rem"
            color="text.menu"
            gutterBottom
            variant="h6"
          >
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
                {dateFormatted(event.start_date, event.end_date)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <EventModal
        selectedEvent={selectedEvent}
        isModalVisible={isModalVisible}
        handleCloseModal={() => setIsModalVisible(false)}
        refresh={refresh}
      />
    </ButtonBase>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
