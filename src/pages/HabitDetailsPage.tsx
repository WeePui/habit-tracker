import {
  Calendar,
  ChevronLeft,
  Clock,
  Flame,
  Play,
  Target,
} from "lucide-react";
import bgImg from "@/assets/images/meditate.jpg";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function HabitDetailsPage() {
  const navigate = useNavigate();

  const completedDates = [
    "2025-08-13",
    "2025-09-15",
    "2025-09-18",
    "2025-09-20",
    "2025-09-21",
    "2025-09-22",
    "2025-09-24",
  ];

  const isCompletedDate = (date: dayjs.Dayjs) => {
    return completedDates.includes(dayjs(date).format("YYYY-MM-DD"));
  };

  const handleStartActivity = () => {
    // Navigate to the countdown page or start the activity directly
    navigate("/countdown");
  };

  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col bg-amber-100">
      <div
        className="relative min-h-[30%] rounded-b-xl bg-cover bg-center"
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
        <div className="mb-6 flex w-full">
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 stroke-[2.5]" />
            Best streak:
          </div>
          <p className="ml-auto">
            <strong>642</strong> days
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

      <div className="sticky bottom-0 left-0 flex w-full justify-center bg-amber-100 py-4">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full bg-amber-700 px-8 py-4 text-xl font-medium text-white shadow-xl ring-2 ring-amber-800 transition-colors duration-300 hover:bg-amber-800"
          onClick={handleStartActivity}
        >
          Start <Play className="w-4" fill="white" />
        </button>
      </div>
    </div>
  );
}
