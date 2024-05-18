import * as React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./Modal.module.css";
import { X } from "lucide-react";
import { saveData } from "../../data/useSavedData";
import toast, { Toaster } from "react-hot-toast";

const Modal = ({ setIsOpen, userId, savedData, onSuccess }) => {
  const [description, setDescription] = React.useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUploadRegistry = async () => {
    try {
      await saveData(description, savedData, userId);
      setIsOpen(false);
      setDescription("");
      onSuccess();
      toast.success("Data registered correctly.")
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
            <h1 className={s.heading}>Save Data</h1>
          </div>
          <button className={s.closeBtn} onClick={() => setIsOpen(false)}>
            <X style={{ marginBottom: "-3px" }} />
          </button>
          <div className={s.modalContent}>
            Add a description for the data
            <Input
              type="text"
              placeholder="Add description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={s.modalActions}>
            <div className={s.actionsContainer}>
              <Button onClick={handleUploadRegistry}>Upload Registry</Button>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default Modal;
