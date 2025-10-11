import { useHabit } from "@/contexts/HabitContext.tsx";
import HabitCard from "./HabitCard";

export default function HabitList() {
  const { habits } = useHabit();

  return (
    <div className="relative mt-4 flex flex-col gap-8 overflow-y-auto px-5 pt-2 pb-30">
      {habits.map((habit, index) => (
        <HabitCard key={index} habit={habit} />
      ))}
    </div>
  );
}
