import { useState } from "react";
import "./PanelLayout.css";
import { cloneElement } from "react";

function PanelLayout({ children, sidebar, header }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev); //alterna entre true y false
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };
  return (
    <div className="panel-layout">
      <header className="panel-header">
        {cloneElement(header, {
          onMenuClick: handleMenuClick,
        })}
      </header>

      <div className="panel-body">
        <aside className={`panel-sidebar ${isSidebarOpen ? "is-open" : ""}`}>
          {cloneElement(sidebar, {
            onClose: closeSidebar,
          })}
        </aside>
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}
        <main className="panel-content">{children}</main>
      </div>
    </div>
  );
}

export default PanelLayout;
