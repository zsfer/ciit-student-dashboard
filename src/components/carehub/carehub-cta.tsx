"use client";

import { useIndexedDb } from "@/hooks/use-indexed-db";
import { CarehubRecord } from "@/lib/types";
import Image from "next/image";
import React from "react";

import CarehubLogo from "/public/carehub-logo.png";
import { OpenCarehub } from "./carehub-form";

export const CarehubCTA = () => {
  const { getItemQuery } = useIndexedDb("carehub");
  const [carehubRecord, setCarehubRecord] = React.useState<CarehubRecord>(
    null!,
  );

  React.useEffect(() => {
    (async () => {
      try {
        const records = await getItemQuery<CarehubRecord>(
          (record) => record.dateRecorded.getDay() == new Date().getDay(),
        );
        setCarehubRecord(records[0]);
      } catch (e) {
        console.error("[carehub]: failed fetching records:", e);
      }
    })();
  }, [getItemQuery]);

  return (
    <div className="rounded-xl bg-cover bg-center px-5 py-7 bg-[url('/bg-carehub.png')] text-white gap-5 flex flex-col">
      <Image src={CarehubLogo} alt="Carehub" className="w-1/3" />

      <div className="gap-1">
        {carehubRecord ? <DidCarehubToday /> : <NeedCarehub />}
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
