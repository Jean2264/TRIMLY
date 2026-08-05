import "./ContactSection.css";
import ContactCard from "./ContactCard";

function ContactSection()
{
     return(
        <div className="contact-section">

            <ContactCard />
            <ContactCard />
        </div>
     )
}

export default ContactSection;