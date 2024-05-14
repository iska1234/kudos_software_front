import clsx from "clsx";
import s from "./Button.module.css";

function Button({ size = "md", variant = "primary",isImportant = false, children, ...delegated }) {
  const classNames = clsx(s.button, s[variant], s[size], {[s.important]: isImportant})

  return (
    <button className={classNames} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
