import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");

        if (isAuthenticated) {
            localStorage.setItem("lastVisitedRoute", location.pathname);
            if (location.pathname === "/login") {
                navigate(lastVisitedRoute || "/", { replace: true });
            }
        } else {
            if (location.pathname !== "/login") {
                localStorage.setItem("lastVisitedRoute", location.pathname);
            }
            if (location.pathname !== "/login") {
                navigate("/login", { replace: true });
            }
        }
    }, [navigate, isAuthenticated, location.pathname]);

    return children;
}
