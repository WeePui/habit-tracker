import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Select from "./Select";

interface TimePickerProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function TimePicker({
  className,
  value,
  onChange,
}: TimePickerProps) {
  const [hour, setHour] = useState<string>("08");
  const [minutes, setMinutes] = useState<string>("00");
  const [selectedTime, setSelectedTime] = useState<"am" | "pm">("am");

  useEffect(() => {
    if (value) {
      const [time, period] = value.split(" ");
      const [h, m] = time.split(":");
      setHour(h);
      setMinutes(m);
      setSelectedTime(period.toLowerCase() === "am" ? "am" : "pm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange?.(`${hour}:${minutes} ${selectedTime}`);
  }, [hour, minutes, selectedTime, onChange]);

  return (
    <div
      className={twMerge(
        className,
        "flex items-center rounded-xl bg-amber-700 text-white",
      )}
    >
      <Select
        className="rounded-l-full hover:bg-amber-800"
        value={hour}
        onChange={setHour}
        options={Array.from({ length: 12 }, (_, i) => ({
          label: i + 1 < 10 ? `0${i + 1}` : (i + 1).toString(),
          value: i + 1 < 10 ? `0${i + 1}` : (i + 1).toString(),
        }))}
        showExpandIcon={false}
        styles={{ option: "text-center p-0" }}
      />
      <span className="pb-0.5">:</span>
      <Select
        className="rounded-none hover:bg-amber-800"
        value={minutes}
        onChange={setMinutes}
        options={Array.from({ length: 60 }, (_, i) => ({
          label: i < 10 ? `0${i}` : i.toString(),
          value: i < 10 ? `0${i}` : i.toString(),
        }))}
        showExpandIcon={false}
        styles={{ option: "text-center p-0" }}
      />
      <Select
        className="rounded-r-full hover:bg-amber-800"
        value={selectedTime}
        onChange={setSelectedTime}
        options={[
          { label: "AM", value: "am" },
          {
            label: "PM",
            value: "pm",
          },
        ]}
        showExpandIcon={false}
        styles={{ option: "text-center p-0" }}
      />
    </div>
  );
}
