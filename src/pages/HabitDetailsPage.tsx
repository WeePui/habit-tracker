import Select from "@/components/ui/Select.tsx";
import { DURATION_OPTIONS } from "@/constants/habitOptions.ts";
import { useHabit } from "@/contexts/HabitContext.tsx";
import { formatFrequencyLabel, isPlural } from "@/helpers/formatHabitLabel.ts";
import { formatTime } from "@/helpers/formatTime.ts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  AlarmClock,
  Calendar,
  ChevronLeft,
  Clock,
  Edit3Icon,
  Flame,
  Play,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function HabitDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getHabitById } = useHabit();
  const habit = getHabitById(id || "");

  const [selectedDuration, setSelectedDuration] = useState(
    habit?.durationPerSession || 5,
  );

  const doneDaysSet = useMemo(
    () => new Set(habit?.doneDays || []),
    [habit?.doneDays],
  );

  if (!habit) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-amber-200/70">
        Habit not found
      </div>
    );
  }

  const isCompletedDate = (date: dayjs.Dayjs) => {
    return doneDaysSet.has(dayjs(date).format("YYYY-MM-DD"));
  };

  return (
    <div className="relative flex h-screen flex-col bg-amber-200/70">
      <div
        className="relative min-h-[30%] rounded-b-xl bg-cover bg-center shadow"
        style={{
          backgroundImage: `url(${habit.imgCover})`,
        }}
      >
        <div
          className="absolute top-4 left-4 flex cursor-pointer items-center gap-0.5 rounded-full bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-200/60"
          onClick={() => navigate("/")}
          role="link"
        >
          <ChevronLeft className="w-3 stroke-3" /> Go back
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-amber-700 px-2 py-1 text-xs font-semibold text-white shadow-md transition-colors duration-300 hover:bg-gray-200/60 hover:text-amber-700/80">
          <Flame className="w-3 stroke-3" />
          <span>{habit.streak}</span>
        </div>

        <div className="absolute bottom-0 left-4 flex translate-y-1/2 items-center gap-0.5 rounded-full bg-amber-700 px-4 py-2 text-xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-gray-200/60 hover:text-amber-700/80">
          {habit.name}
        </div>

        <Link
          className="absolute right-4 bottom-0 flex translate-y-1/2 items-center gap-2 rounded-full bg-white px-2 text-xs font-semibold text-amber-700 transition-colors duration-300 hover:bg-gray-200/60"
          to={`/habits/${habit.id}/edit`}
        >
          <Edit3Icon className="w-2.5 stroke-3" /> Edit
        </Link>
      </div>
      <div className="flex w-full flex-1 flex-col gap-2 px-6 pt-12 text-amber-800">
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Calendar className="w-4 stroke-[2.5]" />
            Start date:
          </div>
          <p className="ml-auto">
            {new Date(habit.startDate).toLocaleString("en-us", {
              dateStyle: "medium",
            })}
          </p>
        </div>
        <div className="flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Target className="w-4 stroke-[2.5]" />
            Goal:
          </div>
          <Select
            options={DURATION_OPTIONS}
            className={
              "ml-auto flex items-center bg-amber-700 text-white transition-colors duration-300 hover:bg-amber-800"
            }
            value={selectedDuration}
            onChange={setSelectedDuration}
            customizableValue
            renderCustomLabel={(value) => formatTime(value)}
          />
        </div>
        <div className="mb-6 flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 stroke-[2.5]" />
            Best streak:
          </div>
          <p className="ml-auto">
            <strong>{habit.bestStreak}</strong>{" "}
            {formatFrequencyLabel(habit.frequency)}
            {isPlural(habit.bestStreak)}
          </p>
        </div>

        <div className="pb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="!max-h-[300px] !w-full rounded-xl bg-white"
              sx={{
                "& .MuiPickersDay-root": {
                  "&.Mui-disabled.Mui-selected": {
                    opacity: 1,
                  },
                  "&.Mui-selected": {
                    backgroundColor: "oklch(55.5% 0.163 48.998)",
                    "&:hover": {
                      backgroundColor: "oklch(47.3% 0.137 46.201)",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
              slotProps={{
                day: (ownerState) => ({
                  className: isCompletedDate(ownerState.day)
                    ? "Mui-selected"
                    : "Mui-disabled",
                }),
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 flex justify-center bg-amber-200/70 px-4 backdrop-blur-3xl">
        <p
          className={
            "flex h-full flex-1 items-center justify-center gap-1.5 border-amber-700 text-sm text-amber-700"
          }
        >
          <AlarmClock className={"w-4 pb-0.5"} />
          <span>{habit.reminderTime}</span>
        </p>
        <Link
          className={"flex flex-1 justify-center"}
          to={`/countdown?duration=${selectedDuration}&habitId=${habit.id}`}
        >
          <button className="my-4 flex cursor-pointer items-center gap-2 rounded-full bg-amber-700 px-8 py-4 text-xl font-medium text-white shadow-xl transition-colors duration-300 hover:bg-amber-800">
            Start <Play className="w-4" fill="white" />
          </button>
        </Link>
        <p
          className={
            "flex h-full flex-1 items-center justify-center border-amber-700 text-sm"
          }
        >
          <span className={"border-b-2 font-semibold text-amber-700"}>
            {habit.progressToday
              ? `${habit.progressToday} today`
              : "Well done!"}
          </span>
        </p>
      </div>
    </div>
  );
}
