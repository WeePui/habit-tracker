import type { Habit } from "@/types/Habit";
import { createContext, useContext, useEffect, useState } from "react";

interface HabitContextType {
  habits: Habit[];
  newHabit(habit: Habit): void;
  updateHabit(habit: Habit): void;
  deleteHabit(id: string): void;
  getHabitById(id: string): Habit | undefined;
}

const HabitContext = createContext<HabitContextType | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const newHabit = (habit: Habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const updateHabit = (habit: Habit) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habit.id ? { ...h, ...habit } : h)),
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const getHabitById = (id: string) => {
    return habits.find((h) => h.id === id);
  };

  return (
    <HabitContext.Provider
      value={{ habits, newHabit, updateHabit, deleteHabit, getHabitById }}
    >
      {children}
    </HabitContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHabit() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabit must be used within a HabitProvider");
  }
  return context;
}
