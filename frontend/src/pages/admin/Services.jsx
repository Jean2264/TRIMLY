import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import { useEffect, useState } from "react";

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
        accessor: "nombre"
    },
    {
        header: "Descripción",
        accessor: "descripcion"
    },
    {
        header: "Costo",
        accessor: "costo"
    },
    {
        header: "Duración",
        accessor: "duracion"
    },
    {
        header: "Estado",
        accessor: "estado"
    },
    {
        header: "Fecha de alta",
        accessor: "fechaalta"
        },
];

function Services(){

    /**ESTADOS necesarios */
    /**Para traer la lista de servicios */
    const [services, setServices]= useState([]);

    /**Para la paginacion */
    const [page, setPage]= useState(1);
    const [totalPage, setTotalPage]= useState(1);
    const [totalRecords, setTotalRecords]= useState(0);

    /**Para el filtrador */
    const [searchInput, setSearchInput]= useState("");
    const [search, setSearch]=useState("");

    /**Columna de acciones para el datatable */
    /**const columns=[
        ...serviceColumns,
        {
        header: "Acciones",
        accessor: "acciones"
        }
    ]*/

    /**Metodo para hacer la peticion GET al servidor y traer la lista de servicios */
    const loadServices= async()=>{
        try{
            const response= await fetch(
                `http://localhost:3000/services?
                search=${encodeURIComponent(search)}&page=${page}& limit=2`
            );


            const data = await response.json();
            
            if(response.ok){
                setServices(data.services);
                setTotalPage(data.totalPage);
                setTotalRecords(data.totalRecords);
            }else{
                console.error(data);
            }

        }catch(error){
    console.error("Error cargando servicios", error);
}
    };

    /**Esto es para que cada que se cargue por primera vez el navegador o ocurra algun cambio
     * ejecute directamente las siguentes funciones
     */

    useEffect(()=>
    {
        loadServices();
    }, [page,search]);
    return(
        <section className="services">
            <div className="services-header">
            <SearchBar
            title="Buscar servicio"/>
            <button
            className="primary-button">
                Nuevo servicio
            </button>
            </div>
        
        </section>
    )
}

export default Services;