"use client";
import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { MobileHeader, MobileNav } from "@/components/sidebar/mobile-nav";
import { cn } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { CarehubDataProvider } from "@/components/carehub/carehub-provider";
import Image from "next/image";
import DP from "/public/chill.webp";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CarehubDataProvider>
        <SidebarProvider>
          <AppSidebar />

          <div className="w-full">
            <MobileHeader />
            <header className="relative items-center border-b px-5 py-3 hidden flex-row justify-between md:flex">
              <ToggleSidebar />
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="font-bold text-xl">Welcome back, Student! 👋</h1>
                <p className="text-sm text-gray-500">Term 1, Week 13</p>
              </div>

              <div className="flex flex-row gap-5 ">
                <div className="flex flex-row gap-5 items-center "></div>
                <a
                  href="/profile"
                  className="rounded-md border p-2 flex flex-row items-center gap-2 hover:bg-gray-50"
                >
                  <Image alt="Me" src={DP} className="rounded-full w-8 h-8" />
                  <div className="flex flex-col text-sm">
                    Chill Guy
                    <div className="text-gray-500 text-xs">12-345-6789</div>
                  </div>
                </a>
              </div>
            </header>
            <main className="px-5 md:py-3 space-y-3 mb-20 md:mb-0">
              {children}
            </main>
          </div>

          <MobileNav />
        </SidebarProvider>
      </CarehubDataProvider>
    </QueryClientProvider>
  );
};

const ToggleSidebar = () => {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "absolute -bottom-4 z-10 rounded-full bg-white border",
        open ? "-left-4" : "left-0",
      )}
    >
      <SidebarTrigger />
    </div>
  );
};

export default AppLayout;
