"use client";
import { AnnouncementCarousel } from "@/components/announcements/announcement-carousel";
import { CarehubCTA } from "@/components/carehub/carehub-cta";
import { ClassSchedule } from "@/components/student/class-schedule";
import { QuickTools } from "@/components/tools/quick-tools";
import React from "react";
import { BrowserView } from "react-device-detect";

const HomePage = () => {
  return (
    <div className="space-y-5">
      <BrowserView>
        <AnnouncementCarousel />
      </BrowserView>
      <div className="flex flex-col md:flex-row gap-5">
        <CarehubCTA />
        <QuickTools />
      </div>
      <ClassSchedule />
    </div>
  );
};

export default HomePage;
