import PanelLayout from "../components/common/panel-layout/PanelLayout";
import BarberSideBar from "../components/admin/BarberSideBar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

function BarberLayout() {
  return (
    <PanelLayout header={<Header />} sidebar={<BarberSideBar />}>
      <Outlet />
    </PanelLayout>
  );
}

export default BarberLayout;
