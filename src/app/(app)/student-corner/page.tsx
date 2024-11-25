"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import Airtable from "@/lib/db/airtable-db";
import { Like, Post } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const StudentCornerPage = () => {
  const { session } = useSession();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { records } = await Airtable.get<Post>("Posts", {
        sort: [{ field: "Created", direction: "desc" }],
      });
      return records;
    },
  });

  // very very dirty
  const likePost = async (id: string) => {
    const { records: likes } = await Airtable.get<Like>("Likes");

    if (likes.some((l) => l.fields.Post[0] === id)) {
      await Airtable.destroy(
        "Likes",
        likes.filter((lk) => lk.fields.Post.some((p) => p === id))[0].id,
      );
      refetch();
      return;
    }

    const { records } = await Airtable.pushSingle<Like>("Likes", {
      Post: [id],
      Session: session,
    });

    if (records) refetch();
  };

  return (
    <div className="space-y-5 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">
        Student <span className="text-primary">Corner</span>
      </h1>

      <div className="flex flex-col gap-3">
        {isLoading && !data && <>Loading... be chill..</>}
        {data &&
          data.map((r) => (
            <div
              key={r.id}
              className="border rounded-lg p-5 max-w-xl space-y-3"
            >
              <div className="flex flex-row items-center gap-3">
                {r.fields["Poster Pic"] && (
                  <Image
                    src={r.fields["Poster Pic"][0].thumbnails!.small.url}
                    width={36}
                    height={36}
                    alt={r.fields["Poster Name"][0]}
                    className="rounded-md object-cover w-[36px] h-[36px]"
                  />
                )}
                <div className="flex flex-col">
                  {r.fields["Poster Name"]}
                  <div className="text-gray-400 text-xs">
                    {dayjs(r.createdTime).fromNow()}
                  </div>
                </div>
              </div>

              <div>{r.fields["Post Content"]}</div>
              {r.fields.Image && (
                <Image
                  src={r.fields.Image[0].thumbnails!.large.url}
                  alt={"post image"}
                  width={512}
                  height={512}
                  className="max-w-lg w-full rounded-lg"
                />
              )}

              <div className="flex flex-row gap-2 items-center p-0">
                <Button
                  onClick={() => likePost(r.id)}
                  variant="ghost"
                  className="p-0 text-lg w-8 h-8"
                >
                  <HeartIcon
                    size={36}
                    className={
                      r.fields.Likes?.some((a) => a === session)
                        ? "text-red-500"
                        : "text-black"
                    }
                  />
                </Button>
                {r.fields.Likes?.length || 0}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentCornerPage;
