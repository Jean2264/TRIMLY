import "./ServiceCard.css";

function ServiceCard({ service, onClick }) {
  {
    /**
        <hr></hr>
       
        
        */
  }
  return (
    <div className="service-card">
      {/*  <img src={barberImg} alt="Corte clasico" /> */}

      <div className="service-info">
        <h3>{service.name}</h3>
        <p className="time">⏱ {service.duration}</p>
        <p className="price">
          <ins>${service.price.toLocaleString("es-AR")}</ins>
        </p>
      </div>
      <button className="submit" onClick={onClick}>
        Reservar
      </button>
    </div>
  );
}

export default ServiceCard;
