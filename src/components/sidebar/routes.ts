import { BookUser, BrainCog, LayoutDashboardIcon } from "lucide-react";

export const generalRoutes = [
  { title: "Dashboard", url: "/", icon: LayoutDashboardIcon, mobile: true },
  { title: "Carehub", url: "/carehub", icon: BrainCog, mobile: true },
  {
    title: "Student Corner",
    url: "/student-corner",
    icon: BookUser,
    mobile: true,
  },
];
