"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { BellPlusIcon } from "lucide-react";
import CarehubLogo from "/public/carehub-logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

type CarehubResponseForm = {
  healthCheck: string;
  healthSymptoms?: HealthCheckSymptoms;
  mentalHealthCheck: number;
  mentalHelp?: MentalCheckHelp;
};

type HealthCheckSymptoms = {
  symptoms: string[];
  location: string;
};

type MentalCheckHelp = {
  concerns?: string;
  appointment: MentalCheckAppointment;
};

type MentalCheckAppointment = {
  wantToSetAppointment: "Yes" | "No" | "AlreadyHaveSession";
  reason: string;
};

export const OpenCarehub = () => {
  const { setValue, watch } = useForm<CarehubResponseForm>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Open Carehub
          <BellPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none rounded-lg">
        <DialogHeader className="p-5 bg-center bg-[url('/bg-carehub.png')] rounded-t-lg text-white text-left">
          <Image src={CarehubLogo} alt="Carehub" className="w-1/4" />
          <h1 className="text-3xl font-bold">Carehub</h1>
          <p>Don&apos;t be afraid to speak up, we&apos;re here for you!</p>
        </DialogHeader>

        <form className="px-5 pb-5 gap-3 flex-col flex">
          Do you have any health issues or feel discomfort today?
          <div className="grid grid-cols-2 gap-2">
            {["I feel good 😀", "I don't feel well 🤧"].map((v) => (
              <Button
                variant="outline"
                key={v}
                type="button"
                onClick={() => {
                  setValue("healthCheck", v);
                }}
                className={cn(
                  v == watch("healthCheck") && "bg-primary/40 border-primary",
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
                  setValue("mentalHealthCheck", i + 1);
                }}
                className={cn(
                  i + 1 == watch("mentalHealthCheck") &&
                    "bg-primary/40 border-primary",
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
          <Button>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
