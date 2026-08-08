import { Form } from "react-router-dom";
import "./Location.css";
import loc from "../../assets/img/map.png";

function Location()
{
    return(
        <div className="location">
            <img className="img-location" src={loc} alt="locate"/>
        </div>
    )
}

export default Location;