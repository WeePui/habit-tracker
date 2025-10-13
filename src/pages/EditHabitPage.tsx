import defaultImg from "@/assets/images/default-habit-cover.jpg";
import Select from "@/components/ui/Select";
import TimePicker from "@/components/ui/TimePicker";
import {
  DURATION_OPTIONS,
  FREQUENCY_OPTIONS,
  TIMES_PER_DAY_OPTIONS,
  WEEKDAYS,
} from "@/constants/habitOptions";
import { useHabit } from "@/contexts/HabitContext";
import { formatTime } from "@/helpers/formatTime";
import { Habit } from "@/types/Habit";
import { motion } from "framer-motion";
import {
  AlarmCheck,
  Calendar,
  Camera,
  ClockFading,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHabitPage() {
  const { id: habitId } = useParams();
  const { getHabitById, updateHabit } = useHabit();
  const habit = getHabitById(habitId || "");

  const [imgCover, setImgCover] = useState<File | string | null>(defaultImg);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [durationPerSession, setDurationPerSession] = useState(5);
  const [reminderTime, setReminderTime] = useState("02:08 PM");

  const navigate = useNavigate();

  const imgInputRef = useRef<HTMLInputElement>(null);

  const monthDays = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i + 1),
    [],
  );

  useEffect(() => {
    if (habit) {
      setHabitName(habit.name);
      setImgCover(habit.imgCover);
      setTimesPerDay(habit.timesPerDay);
      setDurationPerSession(habit.durationPerSession);
      setFrequency(habit.frequency);
      setSelectedWeekDays(habit.scheduledWeekDays);
      setSelectedMonthDays(habit.scheduledMonthlyDays);
      setReminderTime(habit.reminderTime ? habit.reminderTime : "02:08 PM");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!habit) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-amber-200/70">
        Habit not found
      </div>
    );
  }

  const handleChooseImage = () => {
    imgInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!habitName.trim()) {
      alert("Please enter a habit name.");
      return;
    }
    if (!imgCover) {
      alert("Please select a cover image.");
      return;
    }

    const updatedData: Partial<Habit> = {
      ...habit,
      name: habitName,
      imgCover:
        typeof imgCover === "string"
          ? (imgCover as string)
          : URL.createObjectURL(imgCover as Blob),
      timesPerDay,
      durationPerSession,
      frequency: frequency.toLowerCase() || "daily",
      scheduledWeekDays: frequency === "weekly" ? selectedWeekDays : [],
      scheduledMonthlyDays: frequency === "monthly" ? selectedMonthDays : [],
      reminderTime,
    };

    updateHabit(updatedData as Habit);
    navigate("/habits/" + habit.id);
  };

  return (
    <div className="flex h-screen flex-col items-center overflow-auto bg-amber-200/70 pb-6">
      <div
        className="relative flex min-h-[30%] w-full items-center justify-center rounded-b-xl bg-cover bg-center p-4 shadow"
        style={{
          backgroundImage:
            typeof imgCover === "string"
              ? `url(${imgCover})`
              : `url(${URL.createObjectURL(imgCover as File)})`,
        }}
      >
        <input
          ref={imgInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => {
            const file = imgInputRef.current?.files?.[0];
            if (file) {
              setImgCover(file);
            }
          }}
          max={1}
        />
        <button
          className="absolute top-4 right-4 flex translate-y-1/2 items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-200/60"
          onClick={handleChooseImage}
        >
          <Camera className="w-3 stroke-[2.5]" />
          Change image
        </button>
        <textarea
          className="no-scrollbar absolute bottom-0 left-4 flex h-auto max-w-1/2 translate-y-1/2 resize-none items-center gap-0.5 rounded-4xl bg-amber-700 px-4 py-2 text-xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-gray-200/60 hover:text-amber-700/80"
          placeholder="Name your habit"
          onChange={(e) => {
            setHabitName(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          value={habitName}
          rows={1}
        />
      </div>
      <form
        className="flex w-full flex-1 flex-col gap-4 px-6 pt-12 text-amber-800"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Calendar className="w-4 stroke-[2.5]" />
            Start date:
          </div>
          <p className="ml-auto">
            {new Date(Date.now()).toLocaleString("en-us", {
              dateStyle: "medium",
            })}
          </p>
        </div>
        <div className="relative mt-4 border-t">
          <motion.div
            key="extended-content"
            className="mt-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex w-full">
                <label
                  htmlFor="frequency"
                  className="flex items-center gap-1.5 font-semibold"
                >
                  <ClockFading className="w-4 stroke-[2.5]" />
                  Frequency:
                </label>
                <Select
                  className="ml-auto bg-amber-700 px-2 py-1 text-white hover:bg-amber-800"
                  value={frequency}
                  onChange={setFrequency}
                  options={FREQUENCY_OPTIONS}
                  styles={{ option: "text-center p-0" }}
                />
              </div>

              {frequency === "weekly" && (
                <div className="mt-2 mb-4 flex w-full flex-wrap gap-2">
                  {WEEKDAYS.map((day, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="flex-1 rounded-full border-2 border-amber-700 bg-white p-1 text-center text-sm text-amber-800 transition-colors duration-300 hover:bg-amber-800 hover:text-white active:bg-amber-900 active:text-white"
                        style={{
                          backgroundColor: selectedWeekDays.includes(index)
                            ? "#b45309"
                            : "white",
                          color: selectedWeekDays.includes(index)
                            ? "white"
                            : "#78350f",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                        }}
                        onClick={() => {
                          setSelectedWeekDays((prev) =>
                            prev.includes(index)
                              ? prev.filter((day) => day !== index)
                              : [...prev, index],
                          );
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              )}

              {frequency === "monthly" && (
                <div className="mt-2 mb-4 grid w-full grid-cols-7 gap-2">
                  {monthDays.map((day, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="flex-1 rounded-full border-2 border-amber-700 bg-white p-1 text-center text-sm font-semibold text-amber-800 transition-colors duration-300 hover:bg-amber-800 hover:text-white active:bg-amber-900 active:text-white"
                        style={{
                          backgroundColor: selectedMonthDays.includes(index)
                            ? "#b45309"
                            : "white",
                          color: selectedMonthDays.includes(index)
                            ? "white"
                            : "#78350f",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                        }}
                        onClick={() => {
                          setSelectedMonthDays((prev) =>
                            prev.includes(index)
                              ? prev.filter((day) => day !== index)
                              : [...prev, index],
                          );
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex w-full">
                <label
                  className="flex items-center gap-1.5 font-semibold"
                  htmlFor="timesPerDay"
                  onClick={() =>
                    document.getElementById("timesPerDay")?.focus()
                  }
                >
                  <Target className="w-4 stroke-[2.5]" />
                  How many times?
                </label>
                <div className="ml-auto flex items-center gap-2">
                  <Select
                    id="timesPerDay"
                    className="bg-amber-700 px-2 py-1 text-white hover:bg-amber-800"
                    options={TIMES_PER_DAY_OPTIONS}
                    value={timesPerDay}
                    onChange={(value) => setTimesPerDay(value)}
                    customizableValue
                  />{" "}
                  a day
                </div>
              </div>
              <div className="self-end">
                <Select
                  className="w-30 bg-amber-700 px-2 py-1 text-white hover:bg-amber-800"
                  value={durationPerSession}
                  options={DURATION_OPTIONS}
                  onChange={(value) => setDurationPerSession(value)}
                  customizableValue
                  renderCustomLabel={(value) => formatTime(value)}
                />{" "}
                each time
              </div>
              <div className="flex w-full items-center">
                <label
                  className="flex items-center gap-1.5 font-semibold"
                  htmlFor="timesPerDay"
                  onClick={() =>
                    document.getElementById("timesPerDay")?.focus()
                  }
                >
                  <AlarmCheck className="w-4 stroke-[2.5]" />
                  When will we remind you?
                </label>
                <TimePicker
                  className="ml-auto h-fit"
                  value={reminderTime}
                  onChange={setReminderTime}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-6 text-center">
          <button
            className="w-fit rounded-full bg-amber-700 px-8 py-2 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-amber-800"
            type="submit"
          >
            Update Habit
          </button>
          <button
            type="button"
            className="absolute ml-4 h-full text-sm text-amber-700 transition-colors hover:text-amber-600"
            onClick={() => navigate(-1)}
          >
            <span className="border-b-2 pb-0.25 transition-all duration-50 hover:border-b-0">
              Go back
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
