import "./ServiceCard.css";

function ServiceCard({ service, onClick }) {
  return (
    <div className="service-card">
      {/*  <img src={barberImg} alt="Corte clasico" /> */}

      <div className="service-info">
        <h3>{service.name}</h3>
        <hr></hr>
        <p className="time">⏱ {service.time}</p>
        {/* Precio con descuento */}
        <p className="price">
          <ins>${service.price.toLocaleString("es-AR")}</ins>
          {service.oldPrice && (
            <del>${service.oldPrice.toLocaleString("es-AR")}</del>
          )}
        </p>

        <button onClick={onClick}>Reservar</button>
      </div>
    </div>
  );
}

export default ServiceCard;
