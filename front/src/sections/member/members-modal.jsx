import { neutral } from "@/theme/colors";
import { getInitials } from "@/utils/get-initials";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, Card, Divider, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const MemberModal = (props) => {
  const { selectedMember, isModalVisible, handleCloseModal } = props;

  const fullName = selectedMember ? `${selectedMember.first_name} ${selectedMember.last_name}` : "";
  const dateJoined = selectedMember
    ? new Date(selectedMember.date_joined).toLocaleDateString()
    : "";

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
          right: "0",
          transform: "translate(0, -50%)",
          width: 350,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          p: 6,
          color: "neutral.500",
          "@media (max-width: 600px)": {
            width: "100%",
            top: "0",
            transform: "translate(0, 0)",
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
          <Stack spacing={3}>
            <Stack display="flex" alignItems="center">
              <Avatar
                src={selectedMember.profile_picture}
                sx={{ width: 96, height: 96, fontSize: 36 }}
              >
                {getInitials(fullName)}
              </Avatar>
              <Typography color={neutral[700]} mt={3} variant="h4">
                {fullName}
              </Typography>
              <Typography mt={1} mb={1.5} variant="body2">
                Software engineer
              </Typography>
            </Stack>
            <Divider sx={{ borderColor: "neutral.200" }} />
            <Typography color={neutral[700]} variant="h6">
              Member Info
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2">Email: {selectedMember.email}</Typography>
              <Typography variant="body2">Phone: {selectedMember.phone_number}</Typography>
              <Typography variant="body2">Date Joined: {dateJoined}</Typography>
            </Stack>
            <Divider sx={{ borderColor: "neutral.200" }} />
            <Stack spacing={2}>
              <Typography color={neutral[700]} variant="h6">
                Bio
              </Typography>
              <Card sx={{ padding: "1.5rem", bgcolor: "neutral.200" }}>
                <Typography color={neutral[600]} variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                </Typography>
              </Card>
            </Stack>
          </Stack>
        ) : null}
      </Card>
    </Modal>
  );
};
