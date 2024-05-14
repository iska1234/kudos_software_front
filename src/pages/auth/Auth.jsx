import * as React from "react";
import s from "./Auth.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAuth } from "../../contexts/authContext";
import toast, { Toaster } from "react-hot-toast";

function Auth() {
  const { login, signup } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [activeTab, setActiveTab] = React.useState("login");
  const [signUpErrors, setSignUpErrors] = React.useState(null);
  const notify = () => toast.success("Login Success!");
  function handleLoginSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    setStatus("loading");

    login(email, password)
    notify()
      .then(() => {
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  function handleSignupSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const age = event.target.age.value;

    setStatus("loading");

    signup(email, password, name, Number(age))
      .then(() => setStatus("success"))
      .catch((error) => {
        setStatus("error");
        setSignUpErrors(error.message);
      });
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setStatus("idle");
  }

  const isLoading = status === "loading";
  const buttonText = activeTab === "login" ? "Enter" : "Create";
  const hasError = status === "error";

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Sistema de Carga de Datos</h1>
      <div className={s.tabs}>
        <Button
          onClick={() => handleTabChange("login")}
          className={activeTab === "login" ? s.active : ""}
        >
          Login
        </Button>
        <Button
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? s.active : ""}
        >
          Signup
        </Button>
        <Button onClick={notify}>notify</Button>
      </div>
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className={s.form}>
          <div className={s.formfield}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              required
            />
          </div>
          <div className={s.formfield}>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : buttonText}
          </Button>
        </form>
      )}

      {activeTab === "signup" && (
        <form onSubmit={handleSignupSubmit} className={s.form}>
          <div className={s.formfield}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              required
            />
          </div>
          <div className={s.formfield}>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
            />
          </div>
          <div className={s.formfield}>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className={s.formfield}>
            <label htmlFor="age">Age</label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Your Age"
              required
              min={0}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : buttonText}
          </Button>
        </form>
      )}
      {hasError && (
        <p className={s["error-message"]}>
          {signUpErrors || "Invalid Credentials"}
        </p>
      )}
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default Auth;
