import "./ServiceSelectCard.css";

function ServiceSelectCard({ id }) {
  return (
    <label className="service-select-card" htmlFor={id}>
      <input type="checkbox" id={id} name="service" />

      <div className="service-info">
        <h2>Corte</h2>
        <p className="price">
          <ins>$10000</ins>
        </p>
      </div>
    </label>
  );
}

export default ServiceSelectCard;
