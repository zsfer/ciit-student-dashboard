"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCarehubData } from "@/hooks/use-carehub";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";

const CarehubPage = () => {
  const { records } = useCarehubData();
  return (
    <>
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
                <TableCell>
                  {dayjs(r["Date Recorded"]).format("MMM DD, YYYY hh:mm a")}
                </TableCell>
                <TableCell>{r.Status}</TableCell>
                <TableCell>{r["Health Check"]}</TableCell>
                <TableCell>{r["Mental Health Check"]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CarehubPage;
