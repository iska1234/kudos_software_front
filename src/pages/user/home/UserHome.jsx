import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import s from "./UserHome.module.css";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../contexts/authContext";
import DrawerMenu from "../../../components/DrawerMenu";
import { userLinks } from "../../../utils/adminLinks";
import { Menu } from "lucide-react";

const UserHome = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <DrawerMenu
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        links={userLinks}
      />
      <nav className={s.navbar}>
        <div className={s.linkContainer}>
          <Menu className={s.links} color="white" onClick={toggleDrawer} />
          <h2 className={s.title}>Kubos Software</h2>
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
