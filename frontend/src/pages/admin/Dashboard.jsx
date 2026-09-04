import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <p>Resumen general de la barberia.</p>

      <div className="dashboard-stats">
        <article className="stat-card">
          <span>Turnos de hoy</span>
          <strong>0</strong>
        </article>

        <article className="stat-card">
          <span>Clientes</span>
          <strong>0</strong>
        </article>

        <article className="stat-card">
          <span>Servicios activos</span>
          <strong>0</strong>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
