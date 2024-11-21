export type CarehubStatus = "Denied" | "Allowed";
export type CarehubRecord = {
  id: string;
  dateRecorded: Date;
  status: CarehubStatus;
  additionalInfo?: string;
};
