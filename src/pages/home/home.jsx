
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/authContext';

const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button
            variant="secondary"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
    </div>
  )
}

export default Home