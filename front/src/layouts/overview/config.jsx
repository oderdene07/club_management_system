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
      <SvgIcon>
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Events",
    path: "/events",
    icon: (
      <SvgIcon>
        <CalendarDaysIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Members",
    path: "/members",
    icon: (
      <SvgIcon>
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Chat",
    path: "/chat",
    icon: (
      <SvgIcon>
        <ChatBubbleOvalLeftEllipsisIcon />
      </SvgIcon>
    ),
  },
  {
    title: "News",
    path: "/news",
    icon: (
      <SvgIcon>
        <NewspaperIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon>
        <UserIcon />
      </SvgIcon>
    ),
  },
];
