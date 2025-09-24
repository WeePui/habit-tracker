import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import router from "./router";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  );
}
