import { createBrowserRouter } from "react-router-dom";
import App from "../pages/app/App";
import Home from "../pages/home/home";


export const router = createBrowserRouter([

  {
    path: "/login",
    element: <App />
  },
  {
    path: "/home",
    element: <Home />
  },

]);
