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
  Session: string;
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

/// other stuff
export type Announcement = {
  Name: string;
  Description: string;
  "Valid Till": Date;
  "Cover Image": ATAttachment[];
  "External Link": string;
  "Is Popup"?: boolean;
};

export type Schedule = {
  Name: string;
  Room: string;
  Timeslot: Date;
  "Canvas Link": string;
  "Cover Image": ATAttachment[];
};

export type Post = {
  "Post ID": number;
  Created: Date;
  "Post Content": string;
  "Poster Name": string[];
  "Poster Pic": ATAttachment[];
  Image: ATAttachment[];
  Likes: string[];
};

export type Like = {
  ID: string;
  Post: string[];
  Session: string;
  Created: Date;
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
  thumbnails?: {
    small: ATThumbnail;
    large: ATThumbnail;
    full: ATThumbnail;
  };
};

export type ATThumbnail = {
  url: string;
  width: number;
  height: number;
};
