import React, { useEffect } from "react";

export const useIndexedDb = (storeName: string) => {
  const dbName = "StudentDashboard";
  const [db, setDb] = React.useState<IDBDatabase>(null!);

  useEffect(() => {
    const openDb = () => {
      return new Promise<IDBDatabase>((resolve, reject) => {
        if (typeof window !== "undefined") {
          const req = indexedDB.open(dbName, 1);

          req.onupgradeneeded = (e) => {
            const database = (e.target as IDBRequest).result as IDBDatabase;
            if (!database.objectStoreNames.contains(storeName)) {
              database.createObjectStore(storeName, { keyPath: "id" });
            }
          };

          req.onsuccess = (e) => {
            resolve((e.target as IDBRequest).result);
          };

          req.onerror = (e) => {
            const error = (e.target as IDBRequest).error;
            reject(error);
          };
        }
      });
    };

    openDb()
      .then((db) => setDb(db))
      .catch((e) => console.error("[indexedDb]:", e));

    return () => {
      if (db) db.close();
    };
  }, [dbName, storeName]);

  const addItem = (item: unknown) => {
    if (!db) return;

    const trans = db.transaction(storeName, "readwrite");
    const store = trans.objectStore(storeName);
    store.add(item);
  };

  const getItem = (id: string, callback: (req: unknown) => void) => {
    if (!db) {
      callback(undefined);
      return;
    }

    const trans = db.transaction(storeName, "readonly");
    const store = trans.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => {
      callback(request.result);
    };
  };

  async function getItemQuery<T>(
    predicate: (item: T) => boolean,
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!db) reject();

      const trans = db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);

      const items: T[] = [];
      const cursor = store.openCursor();

      cursor.onerror = () => reject(cursor.error);

      cursor.onsuccess = (e) => {
        const cursorVal = (e.target as IDBRequest<IDBCursorWithValue>).result;

        if (cursorVal) {
          resolve(items);
        }

        const item = cursorVal?.value as T;

        if (!item) {
          resolve([]);
          return;
        }

        if (predicate(item)) {
          items.push(item);
        }

        cursorVal.continue();
      };
    });
  }

  return { db, addItem, getItem, getItemQuery };
};
