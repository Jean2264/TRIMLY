import "./Clientes.css";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import DataTable from "../../components/common/DataTable";

function Clients() {
  return (
    <section className="clients">
      <div className="clients-header">
        <SearchBar title="Buscar cliente" />

        <button className="primary-button">Nuevo cliente</button>
      </div>
    </section>
  );
}

export default Clients;
