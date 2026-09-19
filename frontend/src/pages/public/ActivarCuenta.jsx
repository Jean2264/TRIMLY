import "./ActivarCuenta.css";
import Logo from "../../components/common/Logo";

function ActivarCuenta() {
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
          <input id="password" type="password" />
        </div>

        <div className="confirm-password-section">
          <label>Confirmar contraseña</label>
          <input id="confirm-password" type="password" />
        </div>

        <div className="actions-section">{/**boton activar cuenta */}</div>
      </div>
    </main>
  );
}

export default ActivarCuenta;
