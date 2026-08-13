import "./AuxModal.css";
import BtnClose from "./BtnClose";

function AuxModal({children}){
    return(
        
         <div className="aux-overley">
            <div className="aux-modal">
                <BtnClose/>
                <div className="aux-content">
                    {children}
                </div>
            </div>
         </div>
    )
}


export default AuxModal;