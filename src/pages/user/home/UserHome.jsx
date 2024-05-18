import { Link, Outlet } from "react-router-dom";

import s from "./UserHome.module.css";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../contexts/authContext";

const UserHome = () => {
  const { logout } = useAuth();
  return (
    <div>
      <nav className={s.navbar}>
        <div className={s.linkContainer}>
          <Link className={s.links} to={"/user"}>Kubos Software</Link>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </nav>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserHome;
