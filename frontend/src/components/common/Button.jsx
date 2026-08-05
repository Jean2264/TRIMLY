import "./Button.css";

function Button({
    children,
    onClick,
    type = "button",
    className = "",
    ariaLabel = ""
}) {
    return (
        <button
            type={type}
            className={`button ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}

export default Button;