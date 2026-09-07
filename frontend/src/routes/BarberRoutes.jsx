import { Routes, Route } from "react-router-dom";
import BarberLayout from "../layouts/BarberLayout";
import DashboardBarber from "../pages/Barber/DashboardBarber";
import Reservas from "../pages/Barber/Reservas";
import Servicios from "../pages/Barber/Servicios";

function BarberRoutes() {
  return (
    <Routes>
      <Route path="/barber" element={<BarberLayout />}>
        <Route index element={<DashboardBarber />} />
        <Route path="/barber/reservas" element={<Reservas />} />
        <Route path="/barber/services" element={<Servicios />} />
      </Route>
    </Routes>
  );
}

export default BarberRoutes;
