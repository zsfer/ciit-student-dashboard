import { BlocksIcon, BrainCog, LayoutDashboardIcon } from "lucide-react";

export const generalRoutes = [
  { title: "Dashboard", url: "/", icon: LayoutDashboardIcon, mobile: true },
  { title: "Carehub", url: "/carehub", icon: BrainCog, mobile: true },
  {
    title: "Student Tools",
    url: "/student-tools",
    icon: BlocksIcon,
    mobile: true,
  },
];
