import HabitCard from "./HabitCard";
import bookBg from "@/assets/images/books.jpg";
import exercise from "@/assets/images/exercise.jpg";
import meditate from "@/assets/images/meditate.jpg";
import type { Habit } from "@/types/Habit";

const habits = [
  {
    id: "1",
    name: "Read books",
    streak: 37,
    isDone: true,
    imgCover: bookBg,
  },
  {
    id: "2",
    name: "Exercise",
    streak: 5,
    isDone: false,
    imgCover: exercise,
  },
  {
    id: "3",
    name: "Meditate",
    streak: 12,
    isDone: false,
    imgCover: meditate,
  },
] as Habit[];

export default function HabitList() {
  return (
    <div className="relative mt-4 flex flex-col gap-8 overflow-y-auto px-5 pt-2 pb-30">
      {habits.map((habit, index) => (
        <HabitCard key={index} habit={habit} />
      ))}
    </div>
  );
}
