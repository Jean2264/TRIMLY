import "./ActivarCuenta.css";
import { useState } from "react";
import Logo from "../../components/common/Logo";
import PasswordStrength from "../../hooks/PasswordStrength";

function ActivarCuenta() {
  const [password, setPassword] = useState("");
  const passwordIsValid =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!-/:-@[-`{-~]/.test(password);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  return (
    <main className="activar-cuenta">
      <div className="activar-cuenta-header">
        <Logo />

        <h1>Activación de cuenta</h1>
      </div>

      <div className="activar-cuenta-content">
        <div className="perfil-section">
          <div className="avatar-picker">
            <i className="bi bi-image"></i>
          </div>

          <button type="button">Subir imagen</button>

          <span>PNG, JPG o WEBP · Máx. 2 MB</span>
        </div>

        <div className="password-section">
          <label>Contraseña</label>
          <div className="pass-group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="ojo"
              onClick={() => setShowpassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
            </button>
          </div>
          <PasswordStrength value={password} />
        </div>

        <div className="confirm-password-section">
          <label>Confirmar contraseña</label>
          <div className="pass-group">
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              className="ojo"
              onClick={() => setShowpassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
            </button>
          </div>
        </div>

        <div className="actions-section">
          <button type="submit" disabled={!passwordIsValid}>
            Activar cuenta
          </button>
        </div>
      </div>
    </main>
  );
}

export default ActivarCuenta;
