import * as React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./ModalDeleteShare.module.css";
import { X } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import { deleteSharedDataById } from "../../data/useSharedData";

const ModalDeleteShare = ({ setIsOpen, sharedDataId, onSuccess }) => {
  const [description, setDescription] = React.useState("");
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(false);
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    setIsDescriptionValid(newDescription === "Delete Shared");
  };

  const handleUploadRegistry = async () => {
    try {
      await deleteSharedDataById(sharedDataId)
      setIsOpen(false);
      setDescription("");
      onSuccess();
      toast.success("Data deleted correctly.")
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <>
      <div className={s.darkBG} onClick={() => setIsOpen(false)} />
      <div className={s.centered}>
        <div className={s.modal}>
          <div className={s.modalHeader}>
            <h1 className={s.heading}>Delete Shared Data</h1>
          </div>
          <button className={s.closeBtn} onClick={() => setIsOpen(false)}>
            <X style={{ marginBottom: "-3px" }} />
          </button>
          <div className={s.modalContent}>
            <p>
          If you want to Delete, write: &quot;<strong>Delete Shared</strong>&quot;
            </p>
            <Input
              type="text"
              placeholder="Add description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={s.modalActions}>
            <div className={s.actionsContainer}>
              <Button onClick={handleUploadRegistry} disabled={!isDescriptionValid}>Upload Registry</Button>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default ModalDeleteShare;
