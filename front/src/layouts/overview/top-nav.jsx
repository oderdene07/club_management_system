import PropTypes from "prop-types";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "@/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const { user } = useAuth();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(4px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            mt={2}
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            sx={{
              minHeight: TOP_NAV_HEIGHT,
            }}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              {!lgUp && (
                <IconButton
                  sx={{
                    marginLeft: "-8px",
                  }}
                  onClick={onNavOpen}
                >
                  <SvgIcon fontSize="small">
                    <Bars3Icon />
                  </SvgIcon>
                </IconButton>
              )}
              <Typography
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Hello,{" "}
                <strong>
                  {user?.first_name} {user?.last_name}
                </strong>
                !
              </Typography>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 50,
                  width: 50,
                }}
                src={process.env.NEXT_PUBLIC_API_URL + user?.profile_picture}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
