import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { Box, CardMedia, Divider, Drawer, Stack, useMediaQuery } from "@mui/material";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useAuth } from "@/contexts/auth-context";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isAdmin = useAuth().user?.role === "admin";

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack>
          <Box component={NextLink} href="/" width="50%">
            <CardMedia component="img" image="/assets/hackum-logo-dark.png" />
          </Box>
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "primary.light" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {items.map((item) => {
            const active = item.path ? pathname === item.path : false;
            if (item.path === "/settings" && !isAdmin) {
              return null;
            }
            return (
              <SideNavItem
                active={active}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            color: "neutral.800",
            backgroundColor: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          color: "neutral.800",
          backgroundColor: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
