import s from "./Input.module.css";

const Input = ({ id, type = "text", value, ...delegated }) => {
  return (
    <input
      className={s.input}
      id={id}
      type={type}
      value={value}
      {...delegated}
    />
  );
};

export default Input;
