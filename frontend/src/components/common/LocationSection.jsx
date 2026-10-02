import "./LocationSection.css";

function LocationSection() {
  return (
    <section className="location-section">
      <h2>Ubicación</h2>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Avenida+25+de+Mayo+286,+San+Vicente"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-geo-alt"></i>
        Avenida 25 de Mayo 286, San Vicente
      </a>
    </section>
  );
}

export default LocationSection;
