import * as React from "react";
import s from "./SharedData.module.css";
import { PencilLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import useTokenPayload from "../../../hooks/useTokenPayload";
import { getAllAdminSharedData } from "../../../data/useSharedData";
import ModalDeleteShare from "../../../components/ModalDeleteData/ModalDeleteShare";
import { Toaster } from "react-hot-toast";

const SharedAdminData = () => {
  const [savedData, setSavedData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const { userId } = useTokenPayload();
  const [sharedDataIdToDelete, setSharedDataIdToDelete] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAllAdminSharedData(userId);
        const filteredData = data.filter(item => !item.deleted);
        setSavedData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos guardados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleOpenModal = (sharedDataId) => {
    setIsOpen(true);
    setSharedDataIdToDelete(sharedDataId);
  };

  return (
    <div>
      <h1>Shared Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : savedData.length === 0 ? (
        <h3 className={s.textCenter}>No shared records</h3>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Shared to User</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.shared_with_user_name}</td>
                <td>{formatDate(item.created_at)}</td>
                <td className={s["action-column"]}>
                  <Link to={`/shared-details/${item.id}`}>
                    <PencilLine color="#1d4ed8" />{" "}
                  </Link>
                  <Trash2 color="#dc2626" onClick={() => handleOpenModal(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isOpen && (
        <ModalDeleteShare
          setIsOpen={setIsOpen}
          sharedDataId={sharedDataIdToDelete}
          onSuccess={() => {
            setIsOpen(false);
            setSavedData(savedData.filter(item => item.id !== sharedDataIdToDelete));
          }}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default SharedAdminData;
