import CountdownPage from "@/pages/CountdownPage";
import EditHabitPage from "@/pages/EditHabitPage.tsx";
import HabitDetailsPage from "@/pages/HabitDetailsPage";
import HomePage from "@/pages/HomePage";
import NewHabitPage from "@/pages/NewHabitPage";
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
  { path: "/habits/new", element: <NewHabitPage /> },
  {
    path: "/countdown",
    element: <CountdownPage />,
  },
  { path: "/habits/:id/edit", element: <EditHabitPage /> },
]);

export default router;
