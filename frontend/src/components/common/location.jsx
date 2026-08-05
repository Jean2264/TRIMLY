import { Form } from "react-router-dom";
import "./Location.css";
import loc from "../../assets/img/Google_Maps.jpg";

function Location()
{
    return(
        <div className="location">
            <img className="img-location" src={loc} alt="locate"/>
        </div>
    )
}

export default Location;