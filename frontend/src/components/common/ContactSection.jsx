import "./ContactSection.css";

function ContactSection() {
  const contacts = [
    {
      type: "whatsapp",
      label: "WhatsApp",
      value: "+54 11 1234-5678",
      icon: "bi-whatsapp",
      url: "#",
    },
    {
      type: "instagram",
      label: "Instagram",
      value: "@barberia48",
      icon: "bi-instagram",
      url: "#",
    },
    {
      type: "facebook",
      label: "Facebook",
      value: "Barbería 48",
      icon: "bi-facebook",
      url: "#",
    },
  ];

  return (
    <section className="contact-section">
      <div className="contact-card">
        <div className="contact-header">
          <p>Encontranos en nuestras redes y medios de contacto.</p>
        </div>

        <div className="contact-list">
          {contacts.map((contact) => (
            <a key={contact.type} href={contact.url} className="contact-item">
              <div className="contact-icon">
                <i className={`bi ${contact.icon}`}></i>
              </div>

              <div className="contact-info">
                <span>{contact.label}</span>
                <p>{contact.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
