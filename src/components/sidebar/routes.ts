import {
  BookUser,
  BrainCog,
  DramaIcon,
  LayoutDashboardIcon,
} from "lucide-react";

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

export const studentServicesRoutes = [
  {
    title: "Student Organizations",
    url: "/student-services/orgs",
    icon: DramaIcon,
    mobile: false,
  },
];
