"use server";
import { revalidatePath } from "next/cache";
import Airtable from "./db/airtable-db";
import { CarehubRecord, CarehubResponseForm } from "./types";

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
