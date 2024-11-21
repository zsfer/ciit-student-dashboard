"use client";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BellIcon, ChevronDown, SearchIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileLayout>{children}</MobileLayout>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <header className="items-center border-b px-5 py-3 flex flex-row justify-between">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-bold text-xl">Welcome back, Student! 👋</h1>
            <p className="text-sm text-gray-500">Term 1, Week 13</p>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-row gap-5 items-center">
              <SearchIcon />
              <BellIcon />
            </div>
            <div className="flex flex-row items-center gap-2 ">
              <div className="bg-blue-300 w-8 h-8 rounded-full"></div>
              <div className="flex flex-col pr-9">
                <div className="font-bold">CIITzen Name</div>
                <div className="text-gray-500 text-sm">BSEMC</div>
              </div>

              <ChevronDown className="text-gray-500" />
            </div>
          </div>
        </header>
        <main className="px-5 py-3">{children}</main>
      </div>
    </SidebarProvider>
  );
};

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <main className="px-5 py-3">{children}</main>
    </div>
  );
};

export default AppLayout;
