import "./ActivarCuenta.css";
import Logo from "../../components/common/Logo";
function ActivarCuenta() {
  return (
    <div className="activar-cuenta">
      <div className="activar-cuenta-header">
        <Logo />
        <h2>Activacion de cuenta</h2>
      </div>
      <fom className="activar-cuenta-forma">
        <label className="form-label">
          <span>Contraseña</span>
          <input className="form-input" type="password" />
          <label className="form-label">
            <span> Confirmar contraseña</span>
            <input className="form-input" type="password" />
          </label>
        </label>
      </fom>
    </div>
  );
}

export default ActivarCuenta;
