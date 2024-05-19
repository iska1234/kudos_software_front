import * as React from "react";
import Button from "../Button/Button";
import s from "./ModalShareData.module.css";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllUsersWithUserRole,
  insertSharedData,
} from "../../data/useSharedData";

const ModalShareData = ({ setIsOpen, adminId, savedDataId, onSuccess }) => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [usersWithRole, setUsersWithRole] = React.useState([]);
  React.useEffect(() => {
    const fetchUsersWithRole = async () => {
      try {
        const users = await getAllUsersWithUserRole();
        setUsersWithRole(users);
      } catch (error) {
        console.error("Error al obtener los usuarios con roles:", error);
      }
    };

    fetchUsersWithRole();
  }, []);

  const handleUploadRegistry = async () => {
    try {
      await insertSharedData(adminId, savedDataId, selectedUser);
      setIsOpen(false);
      onSuccess();
      toast.success("Data shared correctly.");
    } catch (error) {
      console.error("Error al compartir los datos:", error);
    }
  };

  return (
    <>
      <div className={s.darkBG} onClick={() => setIsOpen(false)} />
      <div className={s.centered}>
        <div className={s.modal}>
          <div className={s.modalHeader}>
            <h1 className={s.heading}>Share Data</h1>
          </div>
          <button className={s.closeBtn} onClick={() => setIsOpen(false)}>
            <X style={{ marginBottom: "-3px" }} />
          </button>
          <div className={s.modalContent}>
            Select user to share
            <select
              className={s.select}
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value={null}>Select a user</option>
              {usersWithRole.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className={s.modalActions}>
            <div className={s.actionsContainer}>
              <Button onClick={handleUploadRegistry}>Share Data</Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default ModalShareData;
