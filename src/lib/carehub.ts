import { revalidatePath } from "next/cache";
import Airtable from "./db/airtable-db";
import { CarehubRecord, CarehubResponseForm } from "./types";
import { localDb } from "./db/local-db";

export const submitCarehub = async (data: CarehubResponseForm) => {
  try {
    // save in airtable
    return saveCarehubOnline(data);
  } catch (e) {
    // no internet, save to idb
    console.log("[carehub]: failed to submit. saving locally as pending:", e);
    return saveCarehubOffline(data);
  }
};

const saveCarehubOnline = async (data: CarehubResponseForm) => {
  const record: CarehubRecord = {
    "Date Recorded": new Date(),
    Student: { id: "usrcmxrYMexpsph81" },
    "Health Check": data.healthCheck,
    "Mental Health Check": data.mentalHealthCheck,
    Status: "Pending",
  };

  const response = await Airtable.pushSingle("Carehub", record);
  revalidatePath("", "layout");
  return response;
};

const saveCarehubOffline = async (data: CarehubResponseForm) => {
  return await saveCarehubOnline(data);
};

export const getCarehubRecords = async () => {
  try {
    // Try getting from cache first
    const db = await localDb;
    const localData = await db.getAll("carehub");

    // check if online
    if (navigator.onLine) {
      const { records: onlineData } = await Airtable.get<CarehubRecord>(
        "Carehub",
        {
          sort: [{ field: "ID", direction: "desc" }],
        },
      );

      if (onlineData.length !== localData.length) {
        console.log(
          "[carehub]: local data mismatch, syncing with latest carehub data",
        );

        const tx = db.transaction("carehub", "readwrite");

        for (const record of onlineData) {
          await tx.store.put(record);
        }
        await tx.done;
        return onlineData;
      }
    }

    return localData;
  } catch (e) {
    console.log(e);
  }
};
