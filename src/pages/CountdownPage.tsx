import successSound from "@/assets/audio/success.mp3";
import bgImg from "@/assets/images/background.jpg";
import CircularCountdown from "@/components/CircularCountdown";
import { useHabit } from "@/contexts/HabitContext.tsx";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function CountdownPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const habitId = searchParams.get("habitId");
  const { getHabitById, updateHabit } = useHabit();
  const habit = getHabitById(habitId || "");

  if (!habit)
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-amber-200/70">
        Habit not found
      </div>
    );

  const duration =
    (Number(searchParams.get("duration")) || habit.durationPerSession || 0) *
    60;

  const handleComplete = () => {
    const audio = new Audio(successSound);
    audio.play();
    console.log("Before update: ", habit);
    habit.toggleDone();
    console.log("After update: ", habit);
    updateHabit(habit);
    navigate(`/habits/${habitId}`);
  };

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
        <CircularCountdown duration={duration} onComplete={handleComplete} />
      </div>
    </div>
  );
}
