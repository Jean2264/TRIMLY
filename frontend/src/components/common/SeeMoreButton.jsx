import "./SeeMoreButton.css"

function SeeMoreButton({onClick,  ariaLabel =""})
{

    return(
        <button className="btn" aria-label={ariaLabel} onClick={onClick}><i className="bi bi-chevron-double-right more"></i></button>
    )
}

export default SeeMoreButton;