"use client";
import React from "react";
import { generalRoutes } from "./routes";
import { usePathname } from "next/navigation";

import CIITLogo from "/public/ciit-logo.png";
import Image from "next/image";
import { BellIcon } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export const MobileHeader = () => {
  return (
    <header className="flex flex-row justify-between w-full items-center px-5 py-8 md:hidden">
      <Image src={CIITLogo} alt="CIIT" className="w-1/3" />
      <div className="flex flex-row gap-5 items-center">
        <BellIcon />
        <SidebarTrigger />
      </div>
    </header>
  );
};

export const MobileNav = () => {
  const path = usePathname();

  return (
    <nav className="flex md:hidden bg-white fixed bottom-0 left-0 w-full border-t flex-row items-center justify-between gap-5 py-5 px-10">
      {generalRoutes
        .filter((r) => r.mobile)
        .map((r, i) => (
          <a
            key={i}
            href={r.url}
            className={path === r.url ? "text-primary" : "text-gray-500"}
          >
            <r.icon />
          </a>
        ))}
    </nav>
  );
};
