import { Habit } from "@/types/Habit";
import { createContext, useContext, useEffect, useState } from "react";

interface HabitContextType {
  habits: Habit[];
  createHabit(habit: Habit): void;
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
      setHabits(() => {
        const parsed = JSON.parse(storedHabits);
        return parsed.map((h: unknown) => Habit.fromJSON(h));
      });
    }
  }, []);

  const createHabit = (habit: Habit) => {
    setHabits((prev) => {
      const newHabits = [...prev, habit];
      localStorage.setItem("habits", JSON.stringify(newHabits));
      return newHabits;
    });
  };

  const updateHabit = (updatedData: Partial<Habit>) => {
    console.log(updatedData);

    setHabits((prev) => {
      const newHabits = prev.map((h) =>
        h.id === updatedData.id ? ({ ...h, ...updatedData } as Habit) : h,
      );
      localStorage.setItem("habits", JSON.stringify(newHabits));
      return newHabits;
    });
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => {
      const newHabits = prev.filter((h) => h.id !== id);
      localStorage.setItem("habits", JSON.stringify(newHabits));
      return newHabits;
    });
  };

  const getHabitById = (id: string) => {
    return Habit.fromJSON(habits.find((h) => h.id === id));
  };

  return (
    <HabitContext.Provider
      value={{ habits, createHabit, updateHabit, deleteHabit, getHabitById }}
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
