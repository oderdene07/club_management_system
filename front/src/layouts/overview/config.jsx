import {
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  NewspaperIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="medium">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Events",
    path: "/events",
    icon: (
      <SvgIcon fontSize="medium">
        <CalendarDaysIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Members",
    path: "/members",
    icon: (
      <SvgIcon fontSize="medium">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Chat",
    path: "/chat",
    icon: (
      <SvgIcon fontSize="medium">
        <ChatBubbleOvalLeftEllipsisIcon />
      </SvgIcon>
    ),
  },
  {
    title: "News",
    path: "/news",
    icon: (
      <SvgIcon fontSize="medium">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="medium">
        <UserIcon />
      </SvgIcon>
    ),
  },
];
