import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

function PublicLayout() {
    return (
        <main className="public-layout">
            <Outlet />
        </main>
    );
}

export default PublicLayout;