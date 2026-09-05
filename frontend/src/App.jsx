import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AuthModal from "./components/common/auth/AuthModal";
import AuthProvider from "./context/AuthProvider";
import BarberRoutes from "./routes/BarberRoutes";

import "../src/styles/global.css";

function App() {
  return (
    <AuthProvider>
      <PublicRoutes />
      <AdminRoutes />
      <BarberRoutes />
      <AuthModal />
    </AuthProvider>
  );
}

export default App;
