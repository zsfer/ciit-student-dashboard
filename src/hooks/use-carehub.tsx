import { CarehubDataContext } from "@/components/carehub/carehub-provider";
import { useContext } from "react";

export const useCarehubData = () => {
  const ctx = useContext(CarehubDataContext);

  if (!ctx)
    throw new Error("useCarehubData must be used within a CarehubDataProvider");

  return ctx;
};
