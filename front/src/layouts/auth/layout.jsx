import { useTheme } from "@/contexts/theme-context";
import { Box, CardMedia, Unstable_Grid2 as Grid } from "@mui/material";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  const { state } = useTheme();
  const mode = state.mode === "dark" ? "white" : "dark";
  console.log(mode);
  return (
    <Box component="main" display="flex" flex="1 1 auto">
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: 150,
            }}
          >
            <CardMedia component="img" image={`/assets/hackum-logo-${mode}.png`} />
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            background: "radial-gradient(50% 50% at 50% 50%, #605BFF 0%, #4338CA 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& img": {
              maxWidth: "90%",
            },
          }}
        >
          <img alt="" src="/assets/auth-illustration.svg" />
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node,
};
