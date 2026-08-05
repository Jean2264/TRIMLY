import "./UserPanel.css";
import UserHeader from "./UserHeader";
import BtnClose from "../BtnClose";
import Button from "../Button";
import UserOptions from "./UserOptions";
import UserFooter from "./UserFooter";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useState } from "react";

function UserPanel(){

   

    const {
        isUserPanelOpen,
        setIsUserPanelOpen
    } = useContext(AuthContext);

    if(!isUserPanelOpen){
        return null;
    }
    function handleClose() {
        setIsUserPanelOpen(false);
    }
    return(

        <aside className="user-panel">

            <BtnClose onClick={handleClose}/>

            <UserHeader/>

            <section>

             <Button >
              Administrar perfil
               </Button>

            </section>

            <hr/>

            <section>
                <UserOptions/>
            </section>

            <hr/>

            <footer>
                <UserFooter/>
            </footer>
        </aside>
    )
};

export default UserPanel;