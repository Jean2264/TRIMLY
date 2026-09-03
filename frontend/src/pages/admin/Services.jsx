import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import ServiceModal from "../../components/service-panel/ServiceModal";
import AuxModal from "../../components/common/AuxModal";
import { useEffect, useState } from "react";
import "./Services.css";

/**Defino las columnas que va a tener la DataTable */
/**IdServicio SERIAL PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL,
	Descripcion VARCHAR(200),
	Costo DECIMAL(10,2) NOT NULL,
	Foto VARCHAR(255),
	Estado BOOLEAN NOT NULL DEFAULT TRUE,
	Duracion INTERVAL NOT NULL,
	FechaAlta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP */

const serviceColumns = [
  {
    header: "Nombre",
    accessor: "nombre",
  },
  {
    header: "Descripción",
    accessor: "descripcion",
  },
  {
    header: "Costo",
    accessor: "costo",
  },
  {
    header: "Duración",
    accessor: "duracion",
    render: (service) => `${service.duracion.minutes}min`,
  },
  {
    header: "Fecha de alta",
    accessor: "fechaalta",
    render: (service) =>
      service.fechaalta
        ? new Date(service.fechaalta).toLocaleDateString("es-AR")
        : "-",
  },
];

function Services() {
  /**ESTADOS necesarios */

  /**Para abrir el modal de servicios */
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [serviceModalMode, setServiceModalMode] = useState(null);

  /**Para traer la lista de servicios */
  const [services, setServices] = useState([]);

  /**Para la paginacion */
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  /**Para el filtrador */
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  /**Columna de acciones para el datatable */
  /**const columns=[
        ...serviceColumns,
        {
        header: "Acciones",
        accessor: "acciones"
        }
    ]*/

  /**Metodo para hacer la peticion GET al servidor y traer la lista de servicios */
  const loadServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/services?
                search=${encodeURIComponent(search)}&page=${page}& limit=2`,
      );

      const data = await response.json();

      if (response.ok) {
        setServices(data.services);
        setTotalPage(data.totalPage);
        setTotalRecords(data.totalRecords);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Error cargando servicios", error);
    }
  };

  /**Esto es para que cada que se cargue por primera vez el navegador o ocurra algun cambio
   * ejecute directamente las siguentes funciones
   */

  useEffect(() => {
    loadServices();
  }, [page, search]);
  return (
    <section className="services">
      <div className="services-header">
        <SearchBar title="Buscar servicio" />
        <button
          className="primary-button"
          onClick={() => {
            setIsServiceModalOpen(true);
          }}
        >
          Nuevo servicio
        </button>
      </div>

      <DataTable columns={serviceColumns} data={services} rowKey="idservicio" />
      {isServiceModalOpen && (
        <AuxModal onClose={() => setIsServiceModalOpen(false)}>
          <ServiceModal
            onClose={() => setIsServiceModalOpen(false)}
            onServiceSaved={loadServices}
          />
        </AuxModal>
      )}
    </section>
  );
}

export default Services;
