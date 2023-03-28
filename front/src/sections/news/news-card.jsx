import PropTypes from "prop-types";
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

export const NewsCard = (props) => {
  const { newsItem } = props;

  const href = {
    pathname: "/news/[id]",
    query: { id: newsItem.id },
  };

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
    console.log(href);
  };

  return (
    <Button
      sx={{
        padding: 0,
        margin: 1,
        minWidth: 270,
        transition: "transform .3s ease-in-out",
        ":hover": {
          backgroundColor: "transparent",
          transform: "scale(1.05)",
        },
      }}
    >
      <Link href={href.pathname} onClick={handleClick} underline="none">
        <Box
          sx={{
            display: "flex",
            height: 200,
          }}
        >
          <CardMedia
            sx={{
              borderRadius: 1,
            }}
            component="img"
            image={newsItem.image}
          />
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
                color="neutral.700"
                gutterBottom
                variant="h6"
              >
                {newsItem.title}
              </Typography>
              <Typography color="neutral.500" gutterBottom variant="body2">
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
