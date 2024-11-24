import { saveCarehubOnline } from "@/lib/carehub";
import Airtable from "@/lib/db/airtable-db";
import { localDb } from "@/lib/db/local-db";
import { CarehubRecord, CarehubResponseForm } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSession } from "./use-session";

export const useCarehubData = () => {
  const { session } = useSession();
  const [records, setRecords] = useState<CarehubRecord[]>(null!);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const refetch = async () => {
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
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitCarehub = async (
    data: CarehubResponseForm,
    sessionId: string,
    path: string = "",
  ) => {
    try {
      // save in airtable
      return saveCarehubOnline(data, sessionId, path);
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

  return { records, submitCarehub, refetch };
};
