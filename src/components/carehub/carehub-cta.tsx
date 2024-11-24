"use client";
import Image from "next/image";
import React from "react";

import CarehubLogo from "/public/carehub-logo.png";
import { OpenCarehub } from "./carehub-form";
import { isValidCarehubRecord } from "@/lib/utils";
import { useCarehubData } from "@/hooks/use-carehub";
import dayjs from "dayjs";
import { CarehubRecord } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const CarehubCTA = () => {
  const { isLoading, records } = useCarehubData();

  return (
    <div className="rounded-xl bg-cover bg-center px-5 py-7 bg-[url('/bg-carehub.png')] text-white gap-5 flex flex-col w-full lg:w-fit">
      <Image src={CarehubLogo} alt="Carehub" className="w-1/3" />
      <div className="gap-1">
        {isLoading && !records ? (
          <h3>Fetching...</h3>
        ) : records && isValidCarehubRecord(records[0]) ? (
          <DidCarehubToday record={records[0]} />
        ) : (
          <NeedCarehub />
        )}
      </div>
    </div>
  );
};

const DidCarehubToday = ({ record }: { record: CarehubRecord }) => {
  return (
    <>
      <h2>You&apos;re all good to go!</h2>
      <div className="text-sm mb-3">
        Cleared at:{" "}
        {dayjs(record["Date Recorded"]).format("MMM DD, YYYY hh:mm a")}
      </div>

      <Link href="/carehub" className="flex-1">
        <Button variant="outline">
          View previous entries
          <ArrowRight />
        </Button>
      </Link>
    </>
  );
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
