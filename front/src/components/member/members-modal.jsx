import { getInitials } from "@/utils/get-initials";
import {
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Card, Divider, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const iconStyles = {
  width: 24,
  height: 24,
  color: "text.card",
  marginRight: 12,
};

export const MemberModal = (props) => {
  const { selectedMember, isModalVisible, handleCloseModal } = props;

  const fullName = selectedMember ? `${selectedMember.first_name} ${selectedMember.last_name}` : "";
  const dateJoined = selectedMember ? new Date(selectedMember.date_joined).toDateString() : "";

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
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          width: 400,
          p: 6,
          color: "text.menu",
          "@media (max-width: 600px)": {
            width: "100%",
            top: "0",
            transform: "translate(50%, 0)",
            borderRadius: 0,
            p: 4,
          },
        }}
      >
        <Box position="absolute" top={0} right={0} p={2} zIndex={1}>
          <Button onClick={handleCloseModal} sx={{ borderRadius: 100, padding: 1, minWidth: 40 }}>
            <XMarkIcon />
          </Button>
        </Box>
        {selectedMember ? (
          <Stack spacing={4}>
            <Stack display="flex" alignItems="center">
              <Avatar
                src={
                  selectedMember.profile_picture &&
                  process.env.NEXT_PUBLIC_API_URL + selectedMember.profile_picture
                }
                sx={{ width: 96, height: 96, fontSize: 36 }}
              >
                {getInitials(fullName)}
              </Avatar>
              <Typography align="center" color="text.secondary" mt={3} variant="h4">
                {fullName}
              </Typography>
              <Typography mt={1} mb={1.5} variant="body1">
                {selectedMember.occupation}
              </Typography>
            </Stack>
            <Divider />
            <Typography color="text.secondary" variant="h6">
              Member Info
            </Typography>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center">
                <EnvelopeIcon style={iconStyles} />
                <Typography variant="body2">{selectedMember.email}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <DevicePhoneMobileIcon style={iconStyles} />
                <Typography variant="body2"> {selectedMember.phone_number}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <CalendarDaysIcon style={iconStyles} />
                <Typography variant="body2"> {dateJoined}</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack spacing={2}>
              <Typography color="text.secondary" variant="h6">
                Bio
              </Typography>
              <Card sx={{ padding: "1.5rem", bgcolor: "action.selected" }}>
                <Typography overflow="auto" maxHeight={70} color="text.secondary" variant="body2">
                  {selectedMember.profile_description}
                </Typography>
              </Card>
            </Stack>
          </Stack>
        ) : null}
      </Card>
    </Modal>
  );
};
