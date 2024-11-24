"use server";
import { revalidatePath } from "next/cache";
import Airtable from "./db/airtable-db";
import { CarehubRecord, CarehubResponseForm } from "./types";

export const saveCarehubOnline = async (
  data: CarehubResponseForm,
  sessionId: string,
  path: string = "",
) => {
  const record: CarehubRecord = {
    "Date Recorded": new Date(),
    Student: { id: "usrcmxrYMexpsph81" },
    "Health Check": data.healthCheck,
    "Mental Health Check": data.mentalHealthCheck,
    Status: "Pending",
    Session: sessionId,
  };

  const response = await Airtable.pushSingle("Carehub", record);
  revalidatePath(path, "layout");
  return response;
};
