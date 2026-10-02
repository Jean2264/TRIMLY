import "./Logo.css";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = (home) => {
    navigate("/");
  };
  return (
    <div className="logo">
      <h1 className="logo_text" onClick={handleLogoClick}>
        Trimly
      </h1>
    </div>
  );
}

export default Logo;
