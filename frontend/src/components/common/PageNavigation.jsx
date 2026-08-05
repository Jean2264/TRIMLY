import "./PageNavigation.css";

function PageNavigation({
    leftText,
    rightText,
    onLeftClick,
    onRightClick,
    disabled
})
{
    return(
        <div className="page-navigation">

            <button onClick={onLeftClick}>
                {leftText}
            </button>


            <button 
            className={`next-button ${disabled ? "disabled" : "enabled"}`}
                onClick={onRightClick}
                disabled={disabled}
            >
                {rightText}
            </button>

        </div>
    )
}

export default PageNavigation;