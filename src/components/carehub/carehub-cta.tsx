"use client";

import { useIndexedDb } from "@/hooks/use-indexed-db";
import { CarehubRecord, CarehubStatus } from "@/lib/types";
import Image from "next/image";
import React from "react";

import CarehubLogo from "/public/carehub-logo.png";
import { OpenCarehub } from "./carehub-form";
import { useQuery } from "@tanstack/react-query";
import { airtable } from "@/lib/db/airtable-db";
import { isValidCarehubRecord } from "@/lib/utils";

export const CarehubCTA = () => {
  const { getItemQuery, addItem } = useIndexedDb("carehub");
  const [localRecord, setCarehubRecord] = React.useState<CarehubRecord>(null!);

  React.useEffect(() => {
    (async () => {
      try {
        const records = await getItemQuery<CarehubRecord>(
          (record) => isValidCarehubRecord(record) ?? false,
        );
        setCarehubRecord(records[0]);
      } catch (e) {
        console.error("[carehub]: failed fetching records:", e);
      }
    })();
  }, [getItemQuery]);

  const { data, isLoading } = useQuery<CarehubRecord>({
    queryKey: ["carehub", new Date().getDate()],
    queryFn: async (): Promise<CarehubRecord> => {
      const records = await airtable("Carehub")
        .select({
          maxRecords: 1,
          view: "Table",
        })
        .firstPage();

      const rawRecord = records[0].fields;
      const record = {
        id: rawRecord["ID"]!.toString(),
        dateRecorded: new Date(rawRecord["Date Recorded"]!.toString()),
        status: rawRecord["Status"] as CarehubStatus,
        additionalInfo: rawRecord["Additional Info"] as string,
      };

      addItem(record);
      return record;
    },
  });

  return (
    <div className="rounded-xl bg-cover bg-center px-5 py-7 bg-[url('/bg-carehub.png')] text-white gap-5 flex flex-col w-full lg:w-fit">
      <Image src={CarehubLogo} alt="Carehub" className="w-1/3" />
      <div className="gap-1">
        {(!isLoading && isValidCarehubRecord(data)) ||
        isValidCarehubRecord(localRecord) ? (
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
