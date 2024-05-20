import s from "./Input.module.css";

const Input = ({
  id,
  type = "text",
  className,
  error,
  value,
  ...delegated
}) => {
  const inputClasses = error ? `${s.input} ${s.error}` : s.input;

  return (
    <input
      className={`${inputClasses} ${className}`}
      id={id}
      type={type}
      value={value}
      data-testid="test-input"
      {...delegated}
    />
  );
};

export default Input;
