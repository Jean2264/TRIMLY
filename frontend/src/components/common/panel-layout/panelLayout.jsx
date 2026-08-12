import "./PanelLayout.css";

function PanelLayout({children, sidebar, header}){

    return(
    <div className="panel-layout">

        <header className="panel-header">
        {header}
        </header>

        <div className="panel-body">
            <aside className="panel-sidebar">
            {sidebar}
        </aside>

        <main className="panel-content">
            {children}
        </main>
        </div>
    </div>
    )
}

export default PanelLayout;