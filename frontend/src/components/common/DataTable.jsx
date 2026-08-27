import "./DataTable.css";

function DataTable({columns, data}){
    return(
        <div className="data-table-wrapper">
            <table className="data-table">

                <thead>
                    <tr>
                        {columns.map((column)=>(
                            <th key={column.accessor}>
                                    {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length===0 ?(
                        <tr>
                            <td colSpan={columns.length}>
                                No hay registros.
                            </td>
                        </tr>
                    ):(
                        data.map((item)=>(
                            <tr key={item.id}>
                                {columns.map((column)=>
                                (
                                    <td key={column.accessor}>
                                        {item[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;