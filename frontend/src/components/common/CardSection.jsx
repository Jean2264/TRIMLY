import { Children } from "react";
import "./CardSection.css";

function CardSection({ children,className=""})
{
    return(
        <section className={`card-section ${className}`}>
            {children}
        </section>
    )
}

export default CardSection;