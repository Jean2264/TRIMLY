import "./AuthModal.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import BtnClose from "../BtnClose";

function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AuthContext);
  const [mode, setMode] = useState("login");

  if (!isAuthModalOpen) {
    return null;
  }

  function handleClose() {
    setMode("login");
    setIsAuthModalOpen(false);
  }
  return (
    <div className="auth-overlay">
      <div className={`auth-modal ${mode === "register" ? "fullscreen" : ""}`}>
        <BtnClose onClick={handleClose} />
        <div className="container">
          {mode === "login" && (
            <LoginForm onRegister={() => setMode("register")} />
          )}

          {mode === "register" && (
            <RegisterForm onLogin={() => setMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
