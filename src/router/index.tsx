import CountdownPage from "@/pages/CountdownPage";
import HabitDetailsPage from "@/pages/HabitDetailsPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/habits/:id",
    children: [
      {
        path: "",
        element: <HabitDetailsPage />,
      },
    ],
  },
  {
    path: "/countdown",
    element: <CountdownPage />,
  },
]);

export default router;
