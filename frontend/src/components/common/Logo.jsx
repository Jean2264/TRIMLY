import "./Logo.css";
import { useNavigate } from "react-router-dom";


function Logo()
{
    const navigate = useNavigate();

    const handleLogoClick= (home)=>
    {
        navigate("/");
    }
    return(

        <div className="logo">
           {/** <img src="" alt="Logo" className="logo_img" /> */}
            <span>TRIMLY</span>

        </div>
    );
}

export default Logo;