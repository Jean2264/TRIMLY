import "./ActivarCuenta.css";
import Logo from "../../components/common/Logo";
import PasswordStrength from "../../hooks/PasswordStrength";
import { useActivarCuenta } from "./useActivarCuenta";
function ActivarCuenta() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    formError,
    imageUpload,
    handleSubmit,
  } = useActivarCuenta();
  return (
    <div className="activar-cuenta">
      <div className="activar-cuenta-header">
        <Logo />
        <h2>Activacion de cuenta</h2>
      </div>

      <form className="activar-cuenta-forma" onSubmit={handleSubmit}>
        <div className="avatar-section">
          <div
            className="avatar-picker"
            onClick={() => imageUpload.fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={imageUpload.fileInputRef}
              onChange={imageUpload.handleFileChange}
              className="hidden-input"
            />

            {imageUpload.preview ? (
              <img
                src={imageUpload.preview}
                alt="vista previa"
                className="avatar-img"
              />
            ) : (
              <span className="avatar-placeholder">Subir foto</span>
            )}
          </div>

          {imageUpload.preview && (
            <button
              type="button"
              onClick={imageUpload.removeFile}
              className="btn-remove-avatar"
            >
              Quitar foto
            </button>
          )}

          {imageUpload.error && (
            <p className="form-error">{imageUpload.error}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            <span>Contraseña</span>
            <input
              id="password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <PasswordStrength value={password} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            <span>Confirmar contraseña</span>
            <input
              id="confirmPassword"
              className="form-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {formError && <p className="form-error">{formError}</p>}

        <button type="submit" className="form-submit-btn">
          Activar cuenta
        </button>
      </form>
    </div>
  );
}

export default ActivarCuenta;
