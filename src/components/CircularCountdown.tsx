import { Check, Pause, Play, RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CircularCountdownProps {
  duration: number; // in seconds
  size?: number;
  strokeWidth?: number;
  onComplete?: () => void;
}

export default function CircularCountdown({
  duration,
  size = 300,
  strokeWidth = 50,
  onComplete,
}: CircularCountdownProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const [encouragementMessage, setEncouragementMessage] = useState("");
  const [baseDuration, setBaseDuration] = useState(duration);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const totalElapsedRef = useRef<number>(0);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (remainingTime <= duration / 2 && remainingTime > duration / 4) {
      setEncouragementMessage("Great job! You're halfway there!");
    } else if (remainingTime <= duration / 4 && remainingTime > 0) {
      setEncouragementMessage("Almost done! Keep pushing!");
    } else if (remainingTime === 0) {
      setEncouragementMessage("Well done! You've completed the countdown!");
    } else {
      setEncouragementMessage("Stay focused and keep going!");
    }
  }, [remainingTime, duration]);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (!startTimeRef.current) return;
      const elapsed =
        (now - startTimeRef.current) / 1000 + totalElapsedRef.current;
      const rem = Math.max(baseDuration - elapsed, 0);

      const progress = (baseDuration - rem) / baseDuration;
      if (circleRef.current) {
        const offset = circumference * (1 - progress);
        circleRef.current.style.strokeDashoffset = String(offset);
      }

      setRemainingTime(rem);

      if (rem > 0) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        onComplete?.();
        totalElapsedRef.current = 0;
        startTimeRef.current = null;
        setIsRunning(false);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, baseDuration, onComplete, circumference]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    if (startTimeRef.current) {
      const currentElapsed = (performance.now() - startTimeRef.current) / 1000;
      totalElapsedRef.current += currentElapsed;
    }
    setIsRunning(false);
    startTimeRef.current = null;
  };

  const addTime = (seconds: number) => {
    setBaseDuration((prev) => prev + seconds);
    setRemainingTime((prev) => prev + seconds);
  };

  const reset = () => {
    setIsRunning(false);
    setRemainingTime(duration);
    setBaseDuration(duration);
    totalElapsedRef.current = 0;
    startTimeRef.current = null;
  };

  return (
    <>
      <p className="mb-6 text-center text-3xl font-bold text-amber-700">
        {encouragementMessage}
      </p>

      <button
        className="mt-4 flex items-center justify-center gap-2 self-end rounded-lg bg-white px-3 py-1 text-sm font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-100"
        onClick={reset}
      >
        <RefreshCcw className="w-3 stroke-3" />{" "}
        <span className="leading-0 font-semibold">Reset</span>
      </button>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r={radius}
          stroke="oklch(55.5% 0.163 48.998)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <foreignObject
          x={size / 4}
          y={size / 4}
          width={size / 2}
          height={size / 2}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            {remainingTime === 0 ? (
              <div className="mb-4 flex h-18 w-18 flex-col items-center justify-center rounded-full bg-teal-600 shadow-md">
                <Check className="w-8 stroke-[4] text-white" />
                <span className="font-semibold text-white">Done</span>
              </div>
            ) : (
              <span
                className="font-bold text-amber-700"
                style={{ fontSize: size / 6 }}
              >
                {formatTime(remainingTime)}
              </span>
            )}
            <button
              onClick={isRunning ? pause : start}
              className="flex w-26 items-center justify-center gap-2 rounded-lg bg-white px-2 py-1 text-sm font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-100"
            >
              {isRunning ? (
                <Pause className="w-3" fill="oklch(55.5% 0.163 48.998)" />
              ) : (
                <Play className="w-3" fill="oklch(55.5% 0.163 48.998)" />
              )}
              {isRunning
                ? "Pause"
                : remainingTime === 0
                  ? "Start over"
                  : "Start"}
            </button>
          </div>
        </foreignObject>
      </svg>
      <div className="mt-4 flex gap-2">
        <button
          className="font-meidu mt-4 flex items-center justify-center gap-2 self-end rounded-lg bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-100"
          onClick={() => addTime(30)}
        >
          + 30s
        </button>
        <button
          className="font-meidu mt-4 flex items-center justify-center gap-2 self-end rounded-lg bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-100"
          onClick={() => addTime(60)}
        >
          + 1m
        </button>
        <button
          className="font-meidu mt-4 flex items-center justify-center gap-2 self-end rounded-lg bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md transition-colors duration-300 hover:bg-gray-100"
          onClick={() => addTime(300)}
        >
          + 5m
        </button>
      </div>
    </>
  );
}
