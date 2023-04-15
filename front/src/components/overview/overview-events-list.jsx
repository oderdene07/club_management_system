import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
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
            <Grid width={320} item key={event.id}>
              <EventCard event={event} />
            </Grid>
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
