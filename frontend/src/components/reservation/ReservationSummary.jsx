import "./ReservationSummary.css";
import i1 from "../../assets/img/i1.jpg";

function ReservationSummary({
  selectedDay,
  selectedTime,
  selectedEmployee,
  selectedService,
  variant = "",
}) {
  return (
    <div className={`reservation-summary ${variant}`}>
      <div className="reservation-summary-header">
        <img className="img" src={i1} />
        {/**src={business.image}
    alt={business.name} */}
        <div className="business-info">
          <h2>Barberia 48</h2>
          <p>Calle 811 550, Alejandro korn, Buenos aires</p>
        </div>
      </div>

      <div className="reservation-summary-content">
        <p>
          <strong>Servicio:</strong> {selectedService?.name}
        </p>
        <p>
          <strong>Empleado:</strong> {selectedEmployee?.name ?? "-"}
        </p>
        <p>
          <strong>Fecha:</strong> {selectedDay ?? "-"}
        </p>
        <p>
          <strong>Hora:</strong> {selectedTime ?? "-"}
        </p>
        <p>
          <strong>Duracion estimado</strong> {selectedService?.time}
        </p>
        <p>
          <strong>Precio:</strong> {selectedService?.price}
        </p>
      </div>
    </div>
  );
}

export default ReservationSummary;
