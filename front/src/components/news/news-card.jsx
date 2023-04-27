import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export const NewsCard = (props) => {
  const { newsItem } = props;

  const href = {
    pathname: "/news/[id]",
    query: {
      id: newsItem.id,
    },
  };

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Button
      sx={{
        padding: 0,
        minWidth: 270,
        width: "100%",
        transition: "transform .3s ease-in-out",
        ":hover": {
          backgroundColor: "transparent",
          transform: "scale(1.04)",
        },
      }}
    >
      <Link width="100%" onClick={handleClick} underline="none">
        <Box
          sx={{
            display: "flex",
            height: 200,
          }}
        >
          {newsItem.image && (
            <CardMedia
              sx={{
                borderRadius: 1,
              }}
              component="img"
              image={process.env.NEXT_PUBLIC_API_URL + newsItem.image}
            />
          )}
        </Box>
        <CardContent sx={{ p: "0.8rem 0.8rem 0.8rem 0" }}>
          <Stack direction="row">
            <Divider
              orientation="vertical"
              sx={{
                height: "2.5rem",
                mt: 0.3,
                mr: 0.8,
                borderWidth: 1.5,
                borderColor: "warning.main",
              }}
            />
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
                align="left"
                color="text.secondary"
                gutterBottom
                variant="h6"
              >
                {newsItem.title}
              </Typography>
              <Typography color="text.card" gutterBottom variant="body2">
                Continue reading...
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Link>
    </Button>
  );
};

NewsCard.propTypes = {
  newsItem: PropTypes.object.isRequired,
};
