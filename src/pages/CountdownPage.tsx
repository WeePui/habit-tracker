import CircularCountdown from "@/components/CircularCountdown";
import { ChevronLeft } from "lucide-react";
import bgImg from "@/assets/images/background.jpg";
import { Link } from "react-router-dom";

export default function CountdownPage() {
  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-amber-200/70"></div>
      <Link
        className="relative flex w-full items-center justify-start gap-3 self-start py-4 text-amber-700"
        to="../"
      >
        <ChevronLeft className="cursor-pointer stroke-3" />
        <span className="text-xl font-bold">Meditate</span>
      </Link>
      <div className="relative mt-24 flex flex-1 flex-col items-center">
        <CircularCountdown duration={60} />
      </div>
    </div>
  );
}
