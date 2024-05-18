import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../contexts/protectedRoute";
import Home from "../pages/admin/home";
import Auth from "../pages/auth/Auth";
import Saved from "../pages/admin/saved";
import Files from "../pages/admin/files";
import SavedDetails from "../pages/admin/savedDetails";
import UserHome from "../pages/user/home/UserHome";
import SharedDetails from "../pages/user/sharedDetails";
import SharedData from "../pages/user/sharedData";


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
        path:'/admin',
        element:<Files />
      },
      {
        path:'/saved',
        element:<Saved />
      },
      {
        path:'/saved-details/:id',
        element:<SavedDetails />
      }
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <UserHome />
      </ProtectedRoute>
    ),
    children:[
      {
        path:'/user',
        element:<SharedData />
      },
      {
        path:'/shared-details/:id',
        element:<SharedDetails />
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