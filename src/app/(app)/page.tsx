import { CarehubCTA } from "@/components/carehub/carehub-cta";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="w-full bg-blue-300 rounded-xl p-20">
        Annoucneemnt carousel
      </div>

      <div className="flex flex-row">
        <div className="">
          <CarehubCTA />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
