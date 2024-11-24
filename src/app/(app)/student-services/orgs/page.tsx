"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Airtable from "@/lib/db/airtable-db";
import { Organization } from "@/lib/types";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const StudentOrgsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { records } = await Airtable.get<Organization>("Organizations");

      return records;
    },
  });

  return (
    <div className="space-y-5 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">
        Student <span className="text-primary">Organizations</span>
      </h1>

      {isLoading && <>More loading...</>}

      {data && (
        <>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl">Your RSO membership</h3>
              <OrgCard org={data[0].fields} />
            </div>

            <Separator />

            <div className="space-y-2">
              {data.map((org) => (
                <OrgCard key={org.id} org={org.fields} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const OrgCard = ({ org }: { org: Organization }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible
      className="border rounded-md p-5 space-y-3"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row.items-center gap-2">
          {org.Image && (
            <Image
              src={org.Image[0].thumbnails?.small.url ?? org.Image[0].url}
              alt={org.Name}
              width={128}
              height={128}
              className="w-12 h-12 object-cover rounded-lg"
            />
          )}
          <div className="flex flex-col items-start">
            <div className="font-bold">{org.Name}</div>
            <div className="text-sm text-gray-500 text-start">
              {org["Short Description"]}
            </div>
          </div>
        </div>

        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <p>{org["Long Description"]}</p>

        <a href={`mailto:${org.Email}`} className="text-primary">
          {org.Email}
        </a>

        <div className="inline-flex gap-3">
          {org.Tags.map((r) => (
            <div key={r} className="bg-red-50 rounded-full px-4">
              {r}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StudentOrgsPage;
