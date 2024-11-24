import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<string>(() => {
    return localStorage.getItem("session") || "";
  });

  useEffect(() => {
    if (!session) {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem("session", newSessionId);
      setSession(newSessionId);
    }
  }, [session]);

  return { session };
};
