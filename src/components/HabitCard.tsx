import { Calendar, ThumbsUp, XCircle } from "lucide-react";
import type { Habit } from "@/types/Habit";
import { useNavigate } from "react-router-dom";

export default function HabitCard({ habit }: { habit: Habit }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={() => navigate(`/habits/${habit.id}`)}
    >
      <div
        className="relative h-30 rounded-t-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${habit.bgImg})`,
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-amber-300/20"></div>
        <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-amber-700">
          {habit.streak}🔥
        </div>
      </div>
      <div className="flex justify-between bg-amber-200 px-4 py-2 text-amber-700">
        <div>
          <h2 className="text-lg leading-tight font-semibold">{habit.name}</h2>
          <p className="mt-1 text-xs opacity-75">Streak: {habit.streak} days</p>
        </div>
        <div className="self-end text-xs">
          {habit.isDone ? (
            <p className="flex items-center justify-end gap-1">
              <ThumbsUp className="w-3 stroke-3 text-green-700" />
              We've done
            </p>
          ) : (
            <p className="flex items-center justify-end gap-1 text-red-700">
              <XCircle className="w-3 stroke-3" />
              Go for it !
            </p>
          )}
          <p className="flex items-center justify-end gap-1 font-extralight">
            <Calendar className="w-3 stroke-3" />
            3/5 this week
          </p>
        </div>
      </div>
    </div>
  );
}
