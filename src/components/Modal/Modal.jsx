import * as React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import s from "./Modal.module.css";
import { X } from "lucide-react";

const Modal = ({ setIsOpen }) => {
  const [description, setDescription] = React.useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
              <Button onClick={() => setIsOpen(false)}>Upload Registry</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
