"use client";
import { OpenCarehub } from "@/components/carehub/carehub-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCarehubData } from "@/hooks/use-carehub";
import { CarehubRecord } from "@/lib/types";
import { cn, isValidCarehubRecord } from "@/lib/utils";
import { cva } from "class-variance-authority";
import dayjs from "dayjs";
import { ShieldAlertIcon } from "lucide-react";
import React from "react";

const carehubEntryVariants = cva("bg-gray-500 rounded-full px-3 py-2", {
  variants: {
    status: {
      Allowed: "bg-green-300 text-green-800",
      Denied: "bg-red-300 text-red-800",
      Pending: "bg-yellow-300 text-yellow-800",
    },
  },
});

const CarehubPage = () => {
  const { records } = useCarehubData();

  return (
    <>
      {records && <HasDoneCarehub record={records[0]} />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Date</TableHead>
            <TableHead className="w-40">Entry</TableHead>
            <TableHead>Health Check</TableHead>
            <TableHead>Health Check</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records &&
            records.map((r, i) => (
              <TableRow key={i} className={cn(i !== 0 && "text-gray-500")}>
                <TableCell className="text-xs lg:text-md">
                  {dayjs(r["Date Recorded"]).format("MMM DD, YYYY hh:mm a")}
                </TableCell>
                <TableCell>
                  <div
                    className={cn(carehubEntryVariants({ status: r.Status }))}
                  >
                    {r.Status}
                  </div>
                </TableCell>
                <TableCell>{r["Health Check"]}</TableCell>
                <TableCell>{r["Mental Health Check"]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

const HasDoneCarehub = ({ record }: { record: CarehubRecord }) => {
  const isValid = isValidCarehubRecord(record);

  if (isValid) return <></>;

  return (
    <div className="bg-yellow-200 p-3 rounded-lg space-y-3 max-w-lg">
      <div className="flex flex-row gap-2 items-center text-yellow-800">
        <ShieldAlertIcon />
        It seems like you haven&apos;t done your Carehub today!
      </div>
      <OpenCarehub />
    </div>
  );
};

export default CarehubPage;
