import React from "react";
import Image from "next/image";
import CIITLogo from "/public/ciit-logo.png";

export const SplashScreen = () => {
  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center">
      <Image src={CIITLogo} alt="CIIT" className="w-1/2" />
    </div>
  );
};
