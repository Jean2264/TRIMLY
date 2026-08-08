import "./SeeMoreButton.css"

function SeeMoreButton({onClick,  ariaLabel =""})
{

    return(
        <button className="btn" aria-label={ariaLabel} onClick={onClick}><i class="bi bi-arrow-right-short more"></i></button>
    )
}

export default SeeMoreButton;