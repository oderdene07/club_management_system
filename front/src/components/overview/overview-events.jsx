import { StarIcon } from "@heroicons/react/24/outline";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const OverviewEvents = (props) => {
  const { value } = props;

  return (
    <Card>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Upcoming Events
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              color: "neutral.100",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <StarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewEvents.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
