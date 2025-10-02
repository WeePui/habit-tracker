export function formatTime(minutes: number) {
  const hour = minutes / 60;
  const minute = minutes % 60;

  if (hour >= 1) {
    return `${Math.floor(hour)}h ${minute}m`;
  }
  return `${minute}m`;
}
