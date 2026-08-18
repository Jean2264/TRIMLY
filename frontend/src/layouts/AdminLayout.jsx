import PanelLayout from "../components/common/panel-layout/PanelLayout";
import AdminSidebar from "../components/admin/AdminSidebar";
import Header from "../components/common/Header";
import "./AdminLayout.css";
import {Outlet} from "react-router-dom";

function AdminLayout(){
    return(
        <PanelLayout 
        header={<Header/>}
        sidebar={<AdminSidebar/>}>
            <Outlet/>
        </PanelLayout>
    )
}

export default AdminLayout;