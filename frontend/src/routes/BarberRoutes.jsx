import { Routes, Route } from "react-router-dom";
import BarberLayout from "../layouts/BarberLayout";
import AdminLayout from "../layouts/AdminLayout";

function BarberRoutes() {
  return (
    <Routes>
      <Route path="/barber" element={<BarberLayout />}></Route>
    </Routes>
  );
}

export default BarberRoutes;
