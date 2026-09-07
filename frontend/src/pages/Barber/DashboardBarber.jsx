import "./DashboardBarber.css";

function DashboardBarber() {
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <p>Resumen general de la barberia.</p>

      <div className="dashboard-stats">
        <article className="stat-card">
          <span>reservas para hoy</span>
          <strong>0</strong>
        </article>

        <article className="stat-card">
          <span>Reserva semanal</span>
          <strong>0</strong>
        </article>

        <article className="stat-card">
          <span>Turnos disponibles</span>
          <strong>0</strong>
        </article>
      </div>
    </section>
  );
}

export default DashboardBarber;
