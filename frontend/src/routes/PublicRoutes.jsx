import {Route, Routes} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";

import Reservation from "../pages/public/Reservation";
import ReservationSuccess from "../pages/public/ReservationSuccess";
import EmployeeProfile from "../components/employees/EmployeeProfile";

function PublicRoutes() {

 return(
    <Routes>
        <Route element={<PublicLayout />}>
           <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
             
             <Route path="/reservation" element={<Reservation/>} />
             <Route path="/employee" element={<EmployeeProfile/>}/>
             <Route path="/reservation-success" element={<ReservationSuccess/>} />
        </Route>
    </Routes>
 )
}

export default PublicRoutes;

