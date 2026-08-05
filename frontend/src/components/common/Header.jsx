import "./Header.css";
import Logo from "./Logo";
import UserButton from "./user/UserButton";

function Header() {
  
    return (

        <header className="header">
            <Logo />
            
            

            <div className="h_user">

           <UserButton/>
            </div>
             
        </header>
    );
}

export default Header;