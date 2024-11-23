import { useEffect, useState } from "react";
import { useIndexedDb } from "./use-indexed-db";
import { CarehubRecord } from "@/lib/types";

export const useNetwork = () => {
  const [isOffline, setIsOffline] = useState(false);
  const { getItemQuery } = useIndexedDb("carehub");

  useEffect(() => {
    const handleOnOnline = async () => {
      setIsOffline(false);

      try {
        const pendingCarehub = await getItemQuery<CarehubRecord>(
          (c) => c.status === "Pending",
        );

        for (var pending of pendingCarehub) {
        }
      } catch (e) {
        console.error(
          "[carehub]: something went wrong trying to fetch saved carehub:" + e,
        );
      }

      // sync pending stuff to carehub
    };

    const handleOnOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", async () => handleOnOnline);
    window.addEventListener("offline", handleOnOffline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isOffline };
};
