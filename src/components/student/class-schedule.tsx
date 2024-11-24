"use client";

import Airtable from "@/lib/db/airtable-db";
import { Schedule } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRightIcon, ClockIcon, DoorOpenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const ClassSchedule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const { records } = await Airtable.get<Schedule>("Class Schedules", {
        sort: [{ field: "Timeslot", direction: "asc" }],
      });

      return records;
    },
  });

  return (
    <>
      <div className="font-bold text-2xl pt-5">
        Your schedule for today,{" "}
        <span className="font-medium text-gray-500">
          {dayjs(new Date()).format("MMMM D")}
        </span>
      </div>

      {isLoading && <></>}
      <ScrollArea className="whitespace no-wrap">
        <div className="flex flex-row gap-5 w-max">
          {data &&
            data.map((s, i) => (
              <div
                key={i}
                style={{
                  backgroundImage: `url(${s.fields["Cover Image"][0].url})`,
                }}
                className="bg-center bg-cover h-72 min-w-96 flex flex-col justify-end border overflow-clip rounded-lg"
              >
                <div className="bg-white p-3 border-t flex flex-col">
                  {s.fields.Name}
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                      <span className="text-sm text-gray-500 inline-flex flex-row gap-2 items-center">
                        <ClockIcon size={14} />
                        {dayjs(s.fields.Timeslot).format("hh:mm a")}
                      </span>
                      <span className="text-sm text-gray-500 inline-flex flex-row gap-2 items-center">
                        <DoorOpenIcon size={14} />
                        {s.fields.Room}
                      </span>
                    </div>

                    <a href={s.fields["Canvas Link"]} target="_blank">
                      <Button variant="outline">
                        Open in Canvas <ArrowRightIcon />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
