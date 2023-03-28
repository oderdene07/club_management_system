import PropTypes from "prop-types";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { EventCard } from "../events/events-card";

export const OverviewEventsList = (props) => {
  const { events } = props;
  const router = useRouter();

  return (
    <Card>
      <CardHeader title="Events" />
      <CardContent>
        <Stack spacing={3} direction="row" alignItems="center" overflow="auto" padding={1}>
          {events.map((event) => (
            <Box key={event.id}>
              <EventCard event={event} />
            </Box>
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={() => {
            router.push("/events");
          }}
        >
          Events
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewEventsList.protoTypes = {
  events: PropTypes.array.isRequired,
};