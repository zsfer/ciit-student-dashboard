import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { CarehubRecord } from "./types";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidCarehubRecord = (record?: CarehubRecord) =>
  record && dayjs(record["Date Recorded"]).isSame(new Date(), "day");

dayjs.extend(relativeTime);
