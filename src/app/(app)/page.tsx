import { AnnouncementCarousel } from "@/components/announcements/announcement-carousel";
import { CarehubCTA } from "@/components/carehub/carehub-cta";
import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-5">
      <AnnouncementCarousel />
      <div className="flex flex-row">
        <div className="w-full">
          <CarehubCTA />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
