export type CarehubStatus = "Denied" | "Allowed";
export type CarehubRecord = {
  id: string;
  dateRecorded: Date;
  studentId: string;
  status: CarehubStatus;
  additionalInfo?: string;
};
