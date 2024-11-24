"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BellPlusIcon } from "lucide-react";
import CarehubLogo from "/public/carehub-logo.png";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  CarehubResponseForm,
  HealthCheckResponse,
  MentalCheckResponse,
} from "@/lib/types";
import { useCarehubData } from "@/hooks/use-carehub";
import { useSession } from "@/hooks/use-session";
import { usePathname, useRouter } from "next/navigation";

export const OpenCarehub = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { submitCarehub } = useCarehubData();
  const { session } = useSession();

  const [open, setOpen] = useState(false);
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CarehubResponseForm>();

  const submitForm: SubmitHandler<CarehubResponseForm> = async (data) => {
    const { records } = await submitCarehub(data, session, pathname);

    if (records) {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          Open Carehub
          <BellPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none rounded-lg">
        <DialogHeader className="p-5 bg-center bg-[url('/bg-carehub.png')] rounded-t-lg text-white text-left">
          <Image src={CarehubLogo} alt="Carehub" className="w-1/4" />
          <DialogTitle className="text-3xl font-bold">Carehub</DialogTitle>
          <p>Don&apos;t be afraid to speak up, we&apos;re here for you!</p>
        </DialogHeader>

        <form
          className="px-5 pb-5 gap-3 flex-col flex"
          onSubmit={handleSubmit(submitForm)}
        >
          Do you have any health issues or feel discomfort today?
          <div className="grid grid-cols-2 gap-2">
            {["I feel good 😀", "I don't feel well 🤧"].map((v) => (
              <Button
                variant="outline"
                key={v}
                type="button"
                onClick={() => {
                  setValue("healthCheck", v as HealthCheckResponse);
                }}
                className={cn(
                  "text-black border-gray-300",
                  v == watch("healthCheck") &&
                    "bg-primary/40 border-primary hover:bg-primary/20 hover:text-primary",
                )}
              >
                {v}
              </Button>
            ))}
          </div>
          How are you feeling today?
          <div className="grid grid-cols-2 gap-2">
            {[
              ["😀", "GREAT!"],
              ["🙂", "Okay!"],
              ["😕", "Going through something"],
              ["☹️", "I need someone to talk to"],
            ].map((v, i) => (
              <Button
                variant="outline"
                key={"mental" + i}
                type="button"
                onClick={() => {
                  setValue("mentalHealthCheck", v[1] as MentalCheckResponse);
                }}
                className={cn(
                  "text-black border-gray-300",
                  v[1] == watch("mentalHealthCheck") &&
                    "bg-primary/40 border-primary hover:bg-primary/20 hover:text-primary",
                  "h-28",
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-5xl">{v[0]}</div>
                  {v[1]}
                </div>
              </Button>
            ))}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
