import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const OverviewTotalMembers = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Members
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              color: "neutral.100",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UserGroupIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalMembers.propTypes = {
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
