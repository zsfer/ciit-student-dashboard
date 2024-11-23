import Airtable from "@/lib/db/airtable-db";
import { localDb } from "@/lib/db/local-db";
import { CarehubRecord } from "@/lib/types";
import { useEffect, useState } from "react";

export const useCarehubData = () => {
  const [records, setRecords] = useState<CarehubRecord[]>(null!);
  const [localRecords, setLocalRecords] = useState<CarehubRecord[]>(null!);
  const [onlineRecords, setOnlineRecords] = useState<CarehubRecord[]>(null!);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try getting from cache first
        const db = await localDb;
        const localData = (
          await db.getAllFromIndex("carehub", "date")
        ).reverse();
        setRecords(localData.map((r) => r.fields));
        setLocalRecords(localData.map((r) => r.fields));

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

            const tx = db.transaction("carehub", "readwrite");

            for (const record of onlineData) {
              await tx.store.put(record);
            }
            await tx.done;
            setRecords(onlineData.map((r) => r.fields));
            setOnlineRecords(onlineData.map((r) => r.fields));
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return { records, localRecords, onlineRecords };
};
