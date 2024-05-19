import * as React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../contexts/authContext";
import s from "./Home.module.css";
import DrawerMenu from "../../../components/DrawerMenu";
import { Menu } from "lucide-react";
import { adminLinks } from "../../../utils/adminLinks";


const Home = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
   <DrawerMenu isOpen={isOpen} toggleDrawer={toggleDrawer} links={adminLinks} />
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

export default Home;
