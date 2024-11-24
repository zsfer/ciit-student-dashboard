import { useSession } from "@/hooks/use-session";
import { saveCarehubOnline } from "@/lib/carehub";
import Airtable from "@/lib/db/airtable-db";
import { localDb } from "@/lib/db/local-db";
import {
  AirtableResponse,
  CarehubRecord,
  CarehubResponseForm,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

type CarehubContextType = {
  records: CarehubRecord[] | null;
  submitCarehub: (
    data: CarehubResponseForm,
    sessionId: string,
  ) => Promise<AirtableResponse<CarehubRecord>>;
  refetch: () => Promise<CarehubRecord[] | undefined>;
  isLoading: boolean;
};

export const CarehubDataContext = createContext<CarehubContextType | undefined>(
  undefined,
);

export const CarehubDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { session } = useSession();
  const [records, setRecords] = useState<CarehubRecord[] | null>([]);

  const { isFetching } = useQuery({
    queryKey: ["carehub"],
    queryFn: async () => await refetch(),
  });

  const refetch = async () => {
    console.log("fetching");
    try {
      // Try getting from cache first
      const localData = (await localDb.carehub.toArray()).reverse();
      setRecords(localData.map((r) => r.fields));

      // check if online
      if (navigator.onLine) {
        const { records: onlineData } = await Airtable.get<CarehubRecord>(
          "Carehub",
          {
            sort: [{ field: "ID", direction: "desc" }],
            filterByFormula: `{Session} = '${session}'`,
          },
        );

        const hasUpdates =
          onlineData.length !== localData.length ||
          JSON.stringify(localData) !== JSON.stringify(onlineData);

        if (hasUpdates) {
          console.log(
            "[carehub]: local data mismatch, syncing with latest carehub data",
          );

          localDb.carehub.clear();
          await localDb.carehub.bulkPut(onlineData);

          setRecords(onlineData.map((r) => r.fields));

          return onlineData.map((r) => r.fields);
        }
      }

      return localData.map((r) => r.fields);
    } catch (e) {
      console.log(e);
    }
  };

  const submitCarehub = async (
    data: CarehubResponseForm,
    sessionId: string,
  ) => {
    try {
      // save in airtable
      return saveCarehubOnline(data, sessionId);
    } catch (e) {
      // no internet, save to idb
      console.log("[carehub]: failed to submit. saving locally as pending:", e);
      return saveCarehubOffline(data, sessionId);
    }
  };

  const saveCarehubOffline = async (
    data: CarehubResponseForm,
    sessionId: string,
  ) => {
    const record: CarehubRecord = {
      "Date Recorded": new Date(),
      Student: { id: "usrcmxrYMexpsph81" },
      "Health Check": data.healthCheck,
      "Mental Health Check": data.mentalHealthCheck,
      Status: "Pending",
      Session: sessionId,
    };

    const toSave = {
      id: crypto.randomUUID(),
      fields: record,
      createdTime: new Date(),
    };

    await localDb.pending.put(toSave);

    return { records: [toSave] };
  };

  //useEffect(() => {
  //  const fetchData = async () => {
  //    await refetch();
  //  };
  //
  //  fetchData();
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [session]);
  //
  return (
    <CarehubDataContext.Provider
      value={{ isLoading: isFetching, records, submitCarehub, refetch }}
    >
      {children}
    </CarehubDataContext.Provider>
  );
};
