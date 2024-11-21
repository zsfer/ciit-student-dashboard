"use client";
import { CarehubCTA } from "@/components/carehub/carehub-cta";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-5">
      {!isMobile && (
        <div className="w-full bg-blue-300 rounded-xl p-20">
          Annoucneemnt carousel
        </div>
      )}

      <div className="flex flex-row">
        <div className="">
          <CarehubCTA />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
