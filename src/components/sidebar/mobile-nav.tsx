"use client";
import React from "react";
import { generalRoutes } from "./routes";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const path = usePathname();

  return (
    <nav className="bg-white fixed bottom-0 left-0 w-full border-t flex flex-row items-center justify-between gap-5 py-5 px-10">
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
