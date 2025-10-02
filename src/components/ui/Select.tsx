import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Option<T = any> {
  readonly label: string;
  readonly value: T;
}

interface SelectProps {
  id?: string;
  options: readonly Option<any>[];
  onChange?: (value: any) => void;
  value?: any;
  className?: string;
  customableValue?: boolean;
  renderLabel?: (value: any) => React.ReactNode;
  renderCustomLabel?: (value: any) => React.ReactNode;
  showExpandIcon?: boolean;
  styles?: { options?: string; option?: string; customInput?: string };
}

export default function Select({
  id,
  options,
  onChange,
  value,
  className,
  customableValue,
  renderLabel,
  renderCustomLabel,
  showExpandIcon = true,
  styles,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState<string | number | undefined>();
  const optionsMap = useMemo(() => {
    return new Map(options.map((opt) => [opt.value, opt.label]));
  }, [options]);
  const outsideClickRef = useOutsideClick(() =>
    setIsOpen(false),
  ) as RefObject<HTMLDivElement>;

  const currentLabel = value ? optionsMap.get(value) : undefined;

  const handleCustomInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && customValue) {
      onChange?.(customValue);
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={outsideClickRef}
      className={twMerge(
        "relative inline-block rounded-4xl px-2 text-center transition-all duration-300",
        className,
      )}
      tabIndex={0}
      role="combobox"
    >
      <button onClick={() => setIsOpen(!isOpen)} id={id}>
        {renderLabel?.(value) ||
          currentLabel ||
          renderCustomLabel?.(value) ||
          value ||
          "Select"}

        {showExpandIcon && (
          <ChevronDown
            className="ml-2 inline-block h-4 w-4 stroke-2 transition-transform duration-200"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={twMerge(
              "no-scrollbar absolute top-full left-0 z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-amber-700 text-white shadow-lg",
              styles?.options,
            )}
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setCustomValue(undefined);
                }}
                className={twMerge(
                  "cursor-pointer px-4 py-2 hover:bg-amber-600",
                  styles?.option,
                )}
                role="option"
              >
                {option.label}
              </div>
            ))}
            {customableValue && (
              <div
                className={twMerge(
                  "border-t border-amber-600",
                  styles?.customInput,
                )}
              >
                <input
                  type="text"
                  value={customValue || ""}
                  onKeyDown={handleCustomInputKeyDown}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="w-full border-0 bg-transparent px-4 py-2 text-center text-sm text-white outline-none"
                  placeholder="Enter value"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
