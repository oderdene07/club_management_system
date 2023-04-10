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
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Events",
    path: "/events",
    icon: (
      <SvgIcon fontSize="small">
        <CalendarDaysIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Members",
    path: "/members",
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Chat",
    path: "/chat",
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleOvalLeftEllipsisIcon />
      </SvgIcon>
    ),
  },
  {
    title: "News",
    path: "/news",
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];
