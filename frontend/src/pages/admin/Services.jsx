import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import ServiceModal from "../../components/service-panel/ServiceModal";
import AuxModal from "../../components/common/AuxModal";
import { useEffect, useState } from "react";
import "./Services.css";
import Pagination from "../../components/common/Pagination";

/**Defino las columnas que va a tener la DataTable */
/**IdServicio SERIAL PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL,
	Descripcion VARCHAR(200),
	Costo DECIMAL(10,2) NOT NULL,
	Foto VARCHAR(255),
	Estado BOOLEAN NOT NULL DEFAULT TRUE,
	Duracion INTERVAL NOT NULL,
	FechaAlta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP */

const formatDuration = (totalMinutes) => {
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
};

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
    render: (service) => formatDuration(service.duracion),
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
  /**Agrego las columnas de accion para el datatable */
  const columns = [
    ...serviceColumns,
    {
      header: "Acciones",
      accessor: "acciones",
      render: (service) => (
        <div className="employee-actions">
          <button
            aria-label="Ver servicio"
            onClick={() => {
              setSelectedServiceId(service.idservicio);
              setServiceModalMode("view");
              setIsServiceModalOpen(true);
            }}
          >
            <i className="bi bi-eye"></i>
          </button>

          <button
            aria-label="Editar servicio"
            onClick={() => {
              setSelectedServiceId(service.idservicio);
              setServiceModalMode("edit");
              setIsServiceModalOpen(true);
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            aria-label="Eliminar servicio"
            onClick={() => {
              setSelectedServiceId(service.idservicio);
              setIsDeleteModalOpen(true);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

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

  /**Para DELETE */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);
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
        `http://localhost:3000/services?search=${encodeURIComponent(search)}&page=${page}&limit=2`,
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

  //funcion para dar de baja a un servicio
  const deleteServicio = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/services/${selectedServiceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setDeleteResult("success");
        await loadServices();

        setTimeout(() => {
          closeDeleteModal();
        }, 2000);

        return;
      }

      if (response.status === 400) {
        setDeleteResult("error");
        console.error(data);
        return;
      }

      if (response.status === 401) {
        setDeleteResult("error");
        console.error("no autorizado");
        return;
      }

      if (response.status === 500) {
        setDeleteResult("error");
        console.error("Error del servidor");
      }
    } catch (error) {
      console.error("Error al dar de baja", error);

      setDeleteResult("error");
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteResult(null);
  };

  return (
    <section className="services">
      <div className="services-header">
        <SearchBar
          title="Buscar servicio"
          value={searchInput}
          onChange={setSearchInput}
          onSearch={() => {
            setSearch(searchInput);
            setPage(1);
            console.log("searchInput:", searchInput);
          }}
        />
        <button
          className="primary-button"
          onClick={() => {
            setServiceModalMode("create");
            setIsServiceModalOpen(true);
          }}
        >
          Nuevo servicio
        </button>
      </div>

      <DataTable columns={columns} data={services} rowKey="idservicio" />
      <Pagination page={page} totalPages={totalPage} onPageChange={setPage} />
      {isServiceModalOpen && (
        <AuxModal
          title={
            serviceModalMode === "create"
              ? "Alta de servicio"
              : serviceModalMode == "view"
                ? "Inspección de servicio"
                : "Edición de servicio"
          }
          onClose={() => setIsServiceModalOpen(false)}
        >
          <ServiceModal
            mode={serviceModalMode}
            serviceId={selectedServiceId}
            onClose={() => setIsServiceModalOpen(false)}
            onServiceSaved={loadServices}
          />
        </AuxModal>
      )}
      {isDeleteModalOpen && (
        <AuxModal title="Dar de baja empleado" onClose={closeDeleteModal}>
          {deleteResult === null ? (
            <div className="delete-confirmation">
              <p>¿Estás seguro de que querés dar de baja este servicio?</p>

              <div className="form-actions">
                <button
                  className="cancelar"
                  type="button"
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>

                <button
                  className="guardar"
                  type="button"
                  onClick={deleteServicio}
                >
                  Dar de baja
                </button>
              </div>
            </div>
          ) : deleteResult === "success" ? (
            <div className="delete-success">
              <div className="status-icon-correct">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <p>El servicio fue dado de baja correctamente.</p>
            </div>
          ) : (
            <div className="delete-error">
              <div className="status-icon-incorrect">
                <i className="bi bi-x-circle-fill"></i>
              </div>
              <p>No se pudo dar de baja al servicio.</p>
            </div>
          )}
        </AuxModal>
      )}
    </section>
  );
}

export default Services;
