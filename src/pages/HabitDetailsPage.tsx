import { Calendar, ChevronLeft, Clock, Flame, Target } from "lucide-react";
import bgImg from "@/assets/images/meditate.jpg";
import { useNavigate } from "react-router-dom";

export default function HabitDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col bg-amber-300">
      <div
        className="relative min-h-1/4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <button
          className="absolute top-4 left-4 flex items-center gap-0.5 rounded-full bg-white px-2 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-200/60"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-3 stroke-3" /> Go back
        </button>
        <button className="absolute bottom-0 left-4 flex translate-y-1/2 items-center gap-0.5 rounded-full bg-amber-700 px-4 py-2 text-xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-gray-200/60">
          Meditate <Flame className="ml-4 w-4" />{" "}
          <span className="text-sm">216</span>
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col gap-2 bg-amber-100 px-6 pt-12 text-amber-800">
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Calendar className="w-4 stroke-[2.5]" />
            Start date:
          </div>
          <p className="ml-auto">Aug 14, 2025</p>
        </div>
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Target className="w-4 stroke-[2.5]" />
            Goal:
          </div>
          <div className="ml-auto flex items-center gap-2">
            <select className="rounded-full bg-amber-700 p-1 text-white">
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>Enter</option>
            </select>{" "}
            a day
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 stroke-[2.5]" />
            Best streak:
          </div>
          <p className="ml-auto">642</p>
        </div>
      </div>
    </div>
  );
}
