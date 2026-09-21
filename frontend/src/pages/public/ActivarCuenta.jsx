import "./ActivarCuenta.css";
import { useState } from "react";
import Logo from "../../components/common/Logo";
import PasswordStrength from "../../hooks/PasswordStrength";
import { useImageUpload } from "../../hooks/useImageUpload";

function ActivarCuenta() {
  const {
    preview,
    error: imageError,
    fileInputRef,
    handleFileChange,
    removeFile,
  } = useImageUpload();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const passwordsMatch =
    confirmPassword.length > 0 &&
    confirmPassword.length >= password.length &&
    confirmPassword === password;

  const passwordIsValid =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!-/:-@[-`{-~]/.test(password);

  const canActivate = passwordIsValid && passwordsMatch;
  return (
    <main className="activar-cuenta">
      <div className="activar-cuenta-header">
        <Logo />

        <h1>Activación de cuenta</h1>
      </div>

      <div className="activar-cuenta-content">
        <div className="perfil-section">
          <div className={`avatar-picker ${preview ? "has-image" : ""}`}>
            {preview ? (
              <>
                <img src={preview} alt="Vista previa del perfil" />

                <button
                  type="button"
                  className="remove-image"
                  onClick={removeFile}
                >
                  <i className="bi bi-x"></i>
                </button>
              </>
            ) : (
              <i className="bi bi-image"></i>
            )}
          </div>

          <button type="button" onClick={() => fileInputRef.current?.click()}>
            {preview ? "Cambiar imagen" : "Subir imagen"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            hidden
          />

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

          {confirmPassword.length > 0 &&
            confirmPassword.length >= password.length && (
              <p
                className={
                  passwordsMatch ? "password-match" : "password-mismatch"
                }
              >
                {passwordsMatch
                  ? "✓ Las contraseñas coinciden"
                  : "Las contraseñas no coinciden"}
              </p>
            )}
        </div>

        <div className={`actions-section ${canActivate ? "active" : ""}`}>
          <button type="submit" disabled={!canActivate}>
            Activar cuenta
          </button>
        </div>
      </div>
    </main>
  );
}

export default ActivarCuenta;
