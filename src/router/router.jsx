import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../contexts/protectedRoute";
import Home from "../pages/home/home";
import Auth from "../pages/auth/Auth";
import Saved from "../pages/saved/Saved";
import Files from "../pages/files/Files";


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children:[
      {
        path:'/',
        element:<Files />
      },
      {
        path:'/saved',
        element:<Saved />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Auth />
      </ProtectedRoute>
    ),
  },
]);