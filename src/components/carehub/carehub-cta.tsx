"use client";
import Image from "next/image";
import React from "react";

import CarehubLogo from "/public/carehub-logo.png";
import { OpenCarehub } from "./carehub-form";
import { isValidCarehubRecord } from "@/lib/utils";
import { useCarehubData } from "@/hooks/use-carehub";

export const CarehubCTA = () => {
  const { records } = useCarehubData();

  return (
    <div className="rounded-xl bg-cover bg-center px-5 py-7 bg-[url('/bg-carehub.png')] text-white gap-5 flex flex-col w-full lg:w-fit">
      <Image src={CarehubLogo} alt="Carehub" className="w-1/3" />
      <div className="gap-1">
        {records && isValidCarehubRecord(records[0]) ? (
          <DidCarehubToday />
        ) : (
          <NeedCarehub />
        )}
      </div>
    </div>
  );
};

const DidCarehubToday = () => {
  return <>nedcar</>;
};

const NeedCarehub = () => {
  return (
    <>
      <h2 className="font-bold text-2xl">You haven&apos;t checked in yet!</h2>
      <div className="text-sm mb-3">Check in to enter campus</div>
      <OpenCarehub />
    </>
  );
};
