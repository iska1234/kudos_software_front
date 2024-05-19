import * as React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./ModalRestoreData.module.css";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { restoreSharedDataById } from "../../data/useSharedData";

const ModalRestoreData = ({ setIsOpen, sharedDataId, onSuccess }) => {
  const [description, setDescription] = React.useState("");
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(false);
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    setIsDescriptionValid(newDescription === "Restore Shared");
  };

  const handleUploadRegistry = async () => {
    try {
      await restoreSharedDataById(sharedDataId)
      setIsOpen(false);
      setDescription("");
      onSuccess();
      toast.success("Restore Data Shared Successfully.")
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
            <h1 className={s.heading}>Restore Data</h1>
          </div>
          <button className={s.closeBtn} onClick={() => setIsOpen(false)}>
            <X style={{ marginBottom: "-3px" }} />
          </button>
          <div className={s.modalContent}>
            <p>
          If you want to Restore, write: &quot;<strong>Restore Shared</strong>&quot;
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
              <Button onClick={handleUploadRegistry} disabled={!isDescriptionValid}>Restore Data</Button>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default ModalRestoreData;
