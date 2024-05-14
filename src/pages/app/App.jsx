import s from "./App.module.css";
import { AuthProvider, useAuth } from "../../contexts/authContext";
import Home from "../home/home";
import Auth from "../auth/Auth";

function App() {
  return (
    <AuthProvider>
      <AppRend />
    </AuthProvider>
  );
}

function AppRend() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={s.wrapper}>{isAuthenticated ? 
    <Home /> : <Auth />}</div>
  );
}

export default App;
