import "./ServiceCaroucel.css";
import ServiceCard from "./ServiceCard";
import SeeMoreButton from "../common/SeeMoreButton";

function ServiceCaroucel({onServiceClick, services})
{
    return(
   <div className="Service-caroucel">
   
    <div className="caroucel-track">
        {services.map(serv =>
            (
                <ServiceCard
                key={serv.id}
                service={serv}
                onClick={()=> onServiceClick(serv)}
                />
            )
        )}
         </div>
        
    {/**<div className="caroucel-indicators">
        <span>.</span>
        <span>.</span>
        <span>.</span>
    </div> */}
   
   </div>
    );
}

export default ServiceCaroucel;