import "./UserButton.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import UserPanel from "./UserPanel";
function UserButton() {

    const {
        user,
        setIsAuthModalOpen,
        isUserPanelOpen,
    setIsUserPanelOpen
    } = useContext(AuthContext);

   
    return (
        <>
        <button
            className={user ? "h_user_btn logged" : "h_user_btn"}
            onClick={() => {
                if (!user) {
                    setIsAuthModalOpen(true);
                }else{
                    setIsUserPanelOpen(!isUserPanelOpen);
                }
            }}
        >
            {user
                ? user.perfil.nombre.charAt(0).toUpperCase()
                : "Login"}
        </button>

        {isUserPanelOpen && <UserPanel />}
        </>
    );
}

export default UserButton; 