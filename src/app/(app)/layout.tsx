"use client";
import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { BellIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import CIITLogo from "/public/ciit-logo.png";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { cn } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        {!!isMobile ? (
          <MobileLayout>{children}</MobileLayout>
        ) : (
          <div className="w-full">
            <header className="relative items-center border-b px-5 py-3 flex flex-row justify-between">
              <ToggleSidebar />
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="font-bold text-xl">Welcome back, Student! 👋</h1>
                <p className="text-sm text-gray-500">Term 1, Week 13</p>
              </div>

              <div className="flex flex-row gap-5 ">
                <div className="flex flex-row gap-5 items-center ">
                  <BellIcon size={20} />
                </div>
                <div className="bg-blue-300 w-6 h-6 rounded-full"></div>
              </div>
            </header>
            <main className="px-5 py-3 space-y-3">{children}</main>
          </div>
        )}
      </SidebarProvider>
    </QueryClientProvider>
  );
};

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <main className="px-5 py-8 space-y-8 mb-14">
        <header className="flex flex-row justify-between w-full items-center">
          <Image src={CIITLogo} alt="CIIT" className="w-1/3" />
          <div className="flex flex-row gap-5 items-center">
            <BellIcon />
            <SidebarTrigger />
          </div>
        </header>
        {children}
      </main>

      <MobileNav />
    </div>
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
