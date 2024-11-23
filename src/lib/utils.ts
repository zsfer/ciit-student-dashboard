import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { CarehubRecord } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidCarehubRecord = (record?: CarehubRecord) =>
  record && dayjs(record.dateRecorded).isSame(new Date(), "day");

export const toAirtableSafeCarehub = (record: CarehubRecord) => {
  return {
    ID: record.id,
    "Date Recorded": record.dateRecorded,
    "Additional Info": record.additionalInfo,
    Status: record.status,
    "Health Check": record.healthCheck,
    "Mental Health Check": record.mentalHealthCheck,
    Student: record.student,
  };
};
