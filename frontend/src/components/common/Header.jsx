import "./Header.css";
import Logo from "./Logo";
import UserButton from "./user/UserButton";

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <div className="header_menu">
        <button onClick={onMenuClick}>
          <i className="bi bi-list"></i>
        </button>
      </div>
      <div className="h_logo">
        <Logo />
      </div>
      <div className="h_user">
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
