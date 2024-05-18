import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import { decryptData } from "../utils/encriptData";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            const encryptedUserRole = localStorage.getItem("userRole");
            const userRole = decryptData(encryptedUserRole);
            const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");

            localStorage.setItem("lastVisitedRoute", location.pathname);
            if (location.pathname === "/login") {
                navigate(lastVisitedRoute || "/", { replace: true });
            } else if (userRole === "admin" && location.pathname.startsWith("/user")) {
                navigate("/admin", { replace: true });
            } else if (userRole === "user" && location.pathname.startsWith("/admin")) {
                navigate("/user", { replace: true });
            }
        } else {
            if (location.pathname !== "/login") {
                localStorage.setItem("lastVisitedRoute", location.pathname);
                navigate("/login", { replace: true });
            }
        }
    }, [navigate, isAuthenticated, location.pathname]);

    return children;
}
