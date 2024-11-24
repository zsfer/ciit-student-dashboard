"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Airtable from "@/lib/db/airtable-db";
import { Announcement } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const AnnouncementCarousel = () => {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>(null!);
  const [current, setCurrent] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["announcement", 5],
    queryFn: async () => {
      const { records } = await Airtable.get<Announcement>("Announcements", {
        maxRecords: 5,
        sort: [{ field: "Created", direction: "desc" }],
      });
      return records;
    },
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isMobile) return <></>;

  if (isLoading && !data) return <AnnouncementSkeleton />;

  return (
    <div className="space-y-2">
      <Carousel setApi={setApi}>
        <CarouselContent className="ml-0.5">
          {data &&
            data.map((announcement, i) => (
              <CarouselItem
                key={i}
                style={{
                  backgroundImage: `url(${announcement.fields["Cover Image"][0].url})`,
                }}
                className={`h-60 bg-center bg-[image:url(${announcement.fields["Cover Image"][0].url})] bg-cover rounded-lg flex flex-col justify-end gap-3 text-white`}
              >
                <div className="flex flex-row justify-between items-end bg-gradient-to-t from-black to-transparent rounded-lg">
                  <div className="space-y-2 py-5">
                    <div className="text-md">
                      {dayjs(announcement.createdTime).format(
                        "MMM DD, YYYY ddd hh:mm a",
                      )}
                    </div>
                    <h2 className="text-2xl font-bold">
                      {announcement.fields.Name}
                    </h2>
                    <div className="text-md">
                      {announcement.fields.Description}
                    </div>
                  </div>
                  {announcement.fields["External Link"] && (
                    <a
                      href={announcement.fields["External Link"]}
                      className="p-5"
                      target="_blank"
                    >
                      <Button className="rounded-full">
                        View details <ExternalLink />
                      </Button>
                    </a>
                  )}
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-row gap-1 items-center justify-center">
        {data &&
          data.map((_, i) => (
            <Button
              onClick={() => api?.scrollTo(i)}
              key={i}
              className={cn(
                "h-2 rounded-full p-0 transition-all",
                i === current ? "w-5" : "w-2 bg-gray-300",
              )}
            ></Button>
          ))}
      </div>
    </div>
  );
};

const AnnouncementSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="w-full h-60 rounded-lg bg-gray-200 flex flex-col justify-end py-3 px-3 gap-3">
        <div className="w-[80px] rounded-full bg-gray-300 h-3"></div>
        <div className="w-1/4 rounded-full bg-gray-300 h-6"></div>
        <div className="w-[200px] rounded-full bg-gray-300 h-4"></div>
      </div>
      <div className="w-full flex justify-center items-center gap-1">
        <div className="w-5 rounded-full bg-gray-300 h-2"></div>
        <div className="w-2 rounded-full bg-gray-300 h-2"></div>
      </div>
    </div>
  );
};
