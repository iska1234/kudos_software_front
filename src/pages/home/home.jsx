import { Link, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/authContext";
import s from "./Home.module.css";

const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <nav className={s.navbar}>
        <div className={s.linkContainer}>
          <Link className={s.links} to={"/"}>Kubos Software</Link>
          <Link className={s.links} to={"/saved"}>Saved Data</Link>
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
