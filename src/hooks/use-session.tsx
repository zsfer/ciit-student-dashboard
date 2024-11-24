"use client";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("session") || "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!session) {
        const newSessionId = crypto.randomUUID();
        localStorage.setItem("session", newSessionId);
        setSession(newSessionId);
      }
    }
  }, [session]);

  return { session };
};
