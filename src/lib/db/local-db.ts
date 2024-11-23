import { DBSchema, openDB } from "idb";
import { CarehubRecord } from "../types";

export interface LocalDBSchema extends DBSchema {
  carehub: { value: CarehubRecord; key: number };
}
export const localDb = openDB("student-dashboard", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("carehub")) {
      const store = db.createObjectStore("carehub", {
        keyPath: "id",
      });
      store.createIndex("id", "id");
      store.createIndex("date", "createdTime");
    }
  },
});
