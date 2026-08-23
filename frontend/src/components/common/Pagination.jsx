import "./Pagination.css";

function Pagination({ page, totalPages, onPageChange }) {

    const getPages = () => {

        // Si hay pocas páginas, mostramos todas
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        // Estamos al principio
        if (page <= 3) {
            return [1, 2, 3, "...", totalPages];
        }

        // Estamos cerca del final
        if (page >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages
            ];
        }

        // Estamos en el medio
        return [
            1,
            "...",
            page - 1,
            page,
            page + 1,
            "...",
            totalPages
        ];
    };

    const pages = getPages();

    return (
        <div className="pagination">

            {/* Página anterior */}
            <button
                type="button"
                className="pagination-arrow"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                ←
            </button>


            {/* Números de página */}
            {pages.map((item, index) => {

                // Tres puntos
                if (item === "...") {
                    return (
                        <span
                            key={`dots-${index}`}
                            className="pagination-dots"
                        >
                            ...
                        </span>
                    );
                }

                // Número de página
                return (
                    <button
                        key={item}
                        type="button"
                        className={`pagination-page ${
                            page === item ? "active" : ""
                        }`}
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </button>
                );
            })}


            {/* Página siguiente */}
            <button
                type="button"
                className="pagination-arrow"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                →
            </button>

        </div>
    );
}

export default Pagination;