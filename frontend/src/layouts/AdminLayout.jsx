import panelLayout from "../components/common/panel-layout/panelLayout";
import {Outlet} from "react-router-dom";

function AdminLayout(){
    return(
        <panelLayout>
            <Outlet/>
        </panelLayout>
    )
}

export default AdminLayout;