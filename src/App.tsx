import { RouterProvider } from "react-router-dom";
import router from "./router";
import { HabitProvider } from "./contexts/HabitContext";

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-md">
      <HabitProvider>
        <RouterProvider router={router} />
      </HabitProvider>
    </div>
  );
}
