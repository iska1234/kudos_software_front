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
import SharedAdminData from "../pages/admin/sharedData/SharedData";
import SharedAdminDetails from "../pages/admin/sharedDetails/SharedDetails";


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
      },
      {
        path:'/shared-data',
        element:<SharedAdminData />
      },
      {
        path:'/shared-detail/:id',
        element:<SharedAdminDetails />
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