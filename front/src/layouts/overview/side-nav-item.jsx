import { Box, ButtonBase } from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";

export const SideNavItem = (props) => {
  const { active = false, icon, path, title } = props;

  const linkProps = path
    ? {
        component: NextLink,
        href: path,
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "1.25rem",
          pr: "1.25rem",
          py: "1rem",
          m: "0.3rem 0",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(96, 91, 255, 0.1)",
          }),
          "&:hover": {
            backgroundColor: "rgba(96, 91, 255, 0.05)",
          },
        }}
        {...linkProps}
      >
        <Box
          component="span"
          sx={{
            alignItems: "center",
            color: "neutral.400",
            display: "inline-flex",
            justifyContent: "center",
            mr: 2,
            ...(active && {
              color: "primary.main",
            }),
          }}
        >
          {icon}
        </Box>
        <Box
          component="span"
          sx={{
            color: "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "primary.main",
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
