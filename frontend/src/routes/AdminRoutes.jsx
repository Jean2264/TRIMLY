import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import Services from "../pages/admin/Services";
import Clients from "../pages/admin/Clientes";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="services" element={<Services />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
