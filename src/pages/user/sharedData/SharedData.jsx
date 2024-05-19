import * as React from "react";

import s from "./SharedData.module.css";
import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import useTokenPayload from "../../../hooks/useTokenPayload";
import { getAllSharedData } from "../../../data/useSharedData";

const SharedData = () => {
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
        const data = await getAllSharedData(userId);
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
      <h1>Shared Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : savedData.length === 0 ? (
        <h3 className={s.textCenter}>No shared records</h3>
      ) : (
        <div className={s.tableContainer}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Shared By Admin</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>{item.admin_name}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td className={s["action-column"]}>
                    <Link to={`/shared-details/${item.id}`}>
                      <PencilLine color="#1d4ed8" />{" "}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedData;
