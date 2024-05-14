import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, [navigate, isAuthenticated]);
  
    return children;
  }