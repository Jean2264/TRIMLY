import { useEffect, useState } from "react";
import "./BusinessInfo.css";

function BusinessInfo() {
  const [status, setStatus] = useState({
    isOpen: false,
    text: "",
  });

  const schedule = {
    open: "10:00",
    close: "20:00",
  };

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();

      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [openHour, openMinute] = schedule.open.split(":");
      const [closeHour, closeMinute] = schedule.close.split(":");

      const openMinutes = Number(openHour) * 60 + Number(openMinute);

      const closeMinutes = Number(closeHour) * 60 + Number(closeMinute);

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        setStatus({
          isOpen: true,
          text: `Abierto · Hasta las ${schedule.close}`,
        });
      } else {
        setStatus({
          isOpen: false,
          text: `Cerrado · Abre a las ${schedule.open}`,
        });
      }
    };

    updateStatus();

    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="business-info">
      <div className="business-info-header">
        <div>
          <h2>Barbería 48</h2>
          <p>Barbería</p>
        </div>

        <div className="business-status">
          <span className={status.isOpen ? "open" : "closed"}>●</span>

          <p>{status.text}</p>
        </div>

        <div className="business-address">
          <i className="bi bi-geo-alt"></i>
          <p>Avenida 25 de Mayo 286, San Vicente</p>
        </div>
      </div>
    </section>
  );
}

export default BusinessInfo;
