export type CarehubStatus = "denied" | "allowed";
export type CarehubRecord = {
  id: string;
  dateRecorded: Date;
  status: CarehubStatus;
  additionalInfo?: string;
};
