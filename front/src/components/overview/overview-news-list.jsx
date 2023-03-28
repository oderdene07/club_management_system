import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import { NewsCard } from "../news/news-card";

export const OverviewNewsList = (props) => {
  const { news } = props;
  const router = useRouter();

  return (
    <Card>
      <CardHeader title="News" />
      <CardContent>
        <Stack spacing={3} direction="row" alignItems="center" overflow="auto" padding={1}>
          {news.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={() => {
            router.push("/news");
          }}
        >
          News
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewNewsList.protoTypes = {
  news: PropTypes.array.isRequired,
};
