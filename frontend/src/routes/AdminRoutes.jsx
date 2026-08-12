import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="employees" element={<Employees/>}/>
            </Route>
        </Routes>
    );
}

export default AdminRoutes;