import * as React from "react";

import s from "./Saved.module.css";
import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import useTokenPayload from "../../../hooks/useTokenPayload";
import { getAllSavedData } from "../../../data/useSavedData";

const Saved = () => {
  const [savedData, setSavedData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { userId } = useTokenPayload();
  
  React.useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAllSavedData(userId);
        setSavedData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos guardados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>All records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : savedData.length === 0 ? (
        <h3 className={s.textCenter}>No hay registros guardados</h3>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>User Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.user_name}</td>
                <td>{formatDate(item.created_at)}</td>
                <td className={s["action-column"]}>
                  <Link to={`/saved-details/${item.id}`}>
                    <PencilLine color="#1d4ed8" />{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Saved;
