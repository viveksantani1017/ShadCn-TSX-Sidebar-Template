import { LuLayoutDashboard, LuList, LuPlus } from "react-icons/lu";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { type NavItem } from "@/types";
export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/",
    // color: "text-sky-500",
  },
  {
    title: "Comapanies",
    icon:  HiOutlineOfficeBuilding,
    href: "/companies",
    // color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "List Companies",
        icon: LuList,
        // color: "text-pink-500",
        href: "/companies",
      },
      {
        title: "Add New Company",
        icon: LuPlus,
        // color: "text-pink-500",
        href: "/companies/addCompany",
      },
    ],
  },
];
