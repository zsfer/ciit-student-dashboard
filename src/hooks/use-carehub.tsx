import Airtable from "@/lib/db/airtable-db";
import { localDb } from "@/lib/db/local-db";
import { CarehubRecord } from "@/lib/types";
import { useEffect, useState } from "react";

export const useCarehubData = () => {
  const [records, setRecords] = useState<CarehubRecord[]>(null!);
  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return { records };
};
