import {Routes, Route} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Appointments from "../pages/admin/Appointments";
import Employees from "../pages/admin/Employees";
import Clients from "../pages/admin/Clients";
import Dashboard from "../pages/admin/Dashboard";
import Services from "../pages/admin/Services";

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
            </Route>
        </Routes>
    );
}
