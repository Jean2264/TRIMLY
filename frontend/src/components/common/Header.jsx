import "./Header.css";
import Logo from "./Logo";

function Header({ children }) {
  return (
    <header className="header">
      <Logo />
      {children}
      <button className="menu-button" type="button" aria-label="Menu">
        <i className="bi bi-list"></i>
      </button>
    </header>
  );
}

export default Header;
