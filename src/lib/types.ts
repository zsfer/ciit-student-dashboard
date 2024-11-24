/// AUTH STUFF
export type User = { id: string; email?: string; name?: string };

/// CAREHUB STUFF
export type CarehubStatus = "Denied" | "Allowed" | "Pending";
export type CarehubRecord = {
  ID?: number;
  "Date Recorded": Date;
  Status: CarehubStatus;
  "Additional Info"?: string;
  "Health Check": string;
  "Mental Health Check": string;
  Student: User;
};

export type CarehubResponseForm = {
  healthCheck: HealthCheckResponse;
  healthSymptoms?: HealthCheckSymptoms;
  mentalHealthCheck: MentalCheckResponse;
  mentalHelp?: MentalCheckHelp;
};

export type HealthCheckResponse = "I feel good 😀" | "I don't feel well 🤧";
export type MentalCheckResponse =
  | "GREAT!"
  | "Okay!"
  | "Going through something"
  | "I need someone to talk to";

export type HealthCheckSymptoms = {
  symptoms: string[];
  location: string;
};

export type MentalCheckHelp = {
  concerns?: string;
  appointment: MentalCheckAppointment;
};

export type MentalCheckAppointment = {
  wantToSetAppointment: "Yes" | "No" | "AlreadyHaveSession";
  reason: string;
};

/// ANNOUNCEMENT STUFF
export type Announcement = {
  Name: string;
  Description: string;
  "Valid Till": Date;
  "Cover Image": ATAttachment[];
  "External Link": string;
  "Is Popup"?: boolean;
};

/// CORE STUFF
export type AirtableResponse<T> = {
  records: {
    id: string;
    createdTime: Date;
    fields: T;
  }[];
};

export type ATAttachment = {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
};
