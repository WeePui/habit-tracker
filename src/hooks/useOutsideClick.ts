import { useEffect, useRef } from "react";

export function useOutsideClick(callback: () => void, listenCapture = false) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick, listenCapture);
    return () => {
      document.removeEventListener("mousedown", handleClick, listenCapture);
    };
  }, [callback, listenCapture]);

  return ref;
}
