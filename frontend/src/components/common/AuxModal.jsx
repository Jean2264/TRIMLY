import "./AuxModal.css";
import BtnClose from "./BtnClose";

function AuxModal({children, onClose, title}){
    return(
        
         <div className="aux-overley">
            <div className="aux-modal">
                 <h2>{title}</h2>
                <BtnClose
                onClick={onClose}/>
                <div className="aux-content">
                    {children}
                </div>
            </div>
         </div>
    )
}


export default AuxModal;