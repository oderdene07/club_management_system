import { useAuth } from "@/contexts/auth-context";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useCallback } from "react";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(() => {
    onClose?.();
    auth.signOut();
    router.push("/auth/login");
  }, [onClose, auth, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
          bgcolor: "background.common",
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {auth.user?.first_name} {auth.user?.last_name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        dense
        sx={{
          p: 1,
          bgcolor: "background.common",
        }}
      >
        <MenuItem
          sx={{
            color: "primary.main",
          }}
          onClick={handleSignOut}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
