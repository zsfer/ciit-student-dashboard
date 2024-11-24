import { AppleIcon } from "lucide-react";

const MostFavouredTools = [
  {
    title: "Consult with a Doctor",
    url: "https://student.ciit.edu.ph/doctors-scheduler?viewMode=modal",
    icon: AppleIcon,
  },
];

export const QuickTools = () => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <h3 className="font-bold text-xl">Quick Tools</h3>
      <div className="border bg-white rounded-lg p-5">
        {MostFavouredTools.map((t, i) => (
          <a
            target="_blank"
            href={t.url}
            key={i}
            className="flex flex-col items-center gap-2"
          >
            <t.icon className="text-white bg-primary rounded-md w-16 h-16 p-2" />
            {t.title}
          </a>
        ))}
      </div>
    </div>
  );
};
