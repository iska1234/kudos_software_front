import * as React from "react";
import s from "./DeletedData.module.css";
import { ArchiveRestore } from "lucide-react";
import { formatDate } from "../../../utils/formatDate";
import { Toaster } from "react-hot-toast";
import { getSharedDataDeleted } from "../../../data/useSharedData";
import ModalRestoreData from "../../../components/ModalRestoreData/ModalRestoreData";

const DeletedData = () => {
  const [savedData, setSavedData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sharedDataIdToDelete, setSharedDataIdToDelete] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSharedDataDeleted();
        setSavedData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error al obtener los datos compartidos con deleted en true:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <div className={s.tableContainer}>
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
                    <ArchiveRestore
                      className={s.link}
                      color="#16a34a"
                      onClick={() => handleOpenModal(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && (
        <ModalRestoreData
          setIsOpen={setIsOpen}
          sharedDataId={sharedDataIdToDelete}
          onSuccess={() => {
            setIsOpen(false);
            setSavedData(
              savedData.filter((item) => item.id !== sharedDataIdToDelete)
            );
          }}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default DeletedData;
