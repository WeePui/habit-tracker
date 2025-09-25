import CircularCountdown from "@/components/CircularCountdown";
import { ChevronLeft } from "lucide-react";
import bgImg from "@/assets/images/background.jpg";

export default function CountdownPage() {
  return (
    <div
      className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-amber-100/80"></div>
      <div className="relative flex w-full items-center justify-start gap-3 self-start py-4 text-amber-700">
        <ChevronLeft className="cursor-pointer stroke-3" />
        <span className="text-xl font-bold">Meditate</span>
      </div>
      <div className="relative mt-24 flex flex-1 flex-col items-center">
        <CircularCountdown duration={60} />
      </div>
    </div>
  );
}
