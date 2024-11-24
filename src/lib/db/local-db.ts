import Dexie, { EntityTable } from "dexie";
import { CarehubRecord } from "../types";

type LocalCarehub = {
  id: string;
  createdTime: Date;
  fields: CarehubRecord;
};

const localDb = new Dexie("student-dashboard") as Dexie & {
  carehub: EntityTable<LocalCarehub, "id">;
  pending: EntityTable<LocalCarehub, "id">;
};

localDb.version(1).stores({
  carehub: "id, createdTime, fields",
  pending: "id, createdTime, fields",
});

export { localDb };
